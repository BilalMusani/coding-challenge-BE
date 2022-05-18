import { GET_USERS_ADVANCED_QUERY } from '../queries/users.queries';
import { apolloClient } from '../apollo';
import {
    GetJobCompanyAndInvestorQuery,
    GetUsersAdvancedQuery,
    GetUsersAdvancedQueryVariables,
    Jobs,
    User,
    Get_Users_Advanced,
    Company_Investors
} from '../generated/graphql';
import { MailingConstants } from '../utils/app.constants';
import { MailingService } from './mailing.service';
import { logError } from '../utils/handlers/error.handler';
import { getMessageFromApolloResult } from '../utils/errors/error.utils';
import * as _ from 'lodash';
import Mail from 'nodemailer/lib/mailer';
import { logger } from '../utils/loggers/default.logger';

export class JobsService {
    constructor(
        private mailingService: MailingService = new MailingService(),
    ) { }

    private combineInvestors(job: Partial<Jobs>): string {
        return job.company.company_investors.map(x => x.investor.name)
            .reduce((previous, curr) => (!previous ? curr : previous + "," + curr));
    }

    private createHtmlListItem(job: Partial<Jobs>): string {
        return '<li> ' + job.title + ' - ' + job.company.name + '(' + this.combineInvestors(job) + ')' + ' located in ' + '<b>' + job.city + '</b>.' + '</li>';
    }

    private createHtmlList(salutation: string, topic: string, jobs: any[]): string {
        return  '<h1>' + salutation + ',</h1>' +
                '<br><br>' +
                '<div>' +
                    '<p>' + topic + '</p>' +
                    '<ul>' +
                        jobs.map(job => this.createHtmlListItem(job)).reduce((acc, jobListItem) => acc + jobListItem, '') +
                    '</ul>' +
                '</div>';
    }

    private createPlainText(job: Jobs) {
        return job.title + ' ' + job.company.name + '(' + this.combineInvestors(job) + ')' + ' located in ' + job.city;
    }

    singleJobPosting(user: Partial<User>[], jobResponse: GetJobCompanyAndInvestorQuery["jobs"]): Promise<any> {
        const job: any = jobResponse[0];
        const html: string = this.createHtmlList(MailingConstants.DEFAULT_SALUTATION, MailingConstants.NEW_JOB_POSTED_TOPIC, [job]);
        const plaintext = MailingConstants.DEFAULT_SALUTATION + ", " + MailingConstants.NEW_JOB_POSTED_TOPIC + "; " + this.createPlainText(job);
        const mailOptions = {
            to: user.map(x => x.email),
            subject: MailingConstants.NEW_JOB_POSTED_SUBJECT, // Subject line
            text: plaintext, // plaintext body
            html,
        };
        return this.mailingService.sendEmail([mailOptions]);
    }

    async sendDigest() {
        const data = await apolloClient.query<GetUsersAdvancedQuery, GetUsersAdvancedQueryVariables>({
            query: GET_USERS_ADVANCED_QUERY,
            // This query is run via cron job so no need to cache
            fetchPolicy: 'no-cache'
        });

        if (data.error || data.errors || data.networkStatus === 8) {
            return logError(getMessageFromApolloResult(data));
        }

        if (data.data && data.data.get_users_advanced.length > 0) {
            const users: { [key: string]: Jobs[] } = {}
            const jobs: { [key: string]: Jobs } = {}
            const companyToInvestorDict: { [key: string]: Set<string> } = {}

            data.data.get_users_advanced.forEach(user => {
                if(!companyToInvestorDict.hasOwnProperty(user.company_name)) {
                    companyToInvestorDict[user.company_name] = new Set<string>();
                }
                companyToInvestorDict[user.company_name].add(user.investor_name);
            });

            data.data.get_users_advanced.forEach(user => {
                if(!users.hasOwnProperty(user.email)) {
                    users[user.email] = [];
                }
                if(!jobs.hasOwnProperty(user.job_id)) {
                    jobs[user.job_id] = this.createJob(user, [...companyToInvestorDict[user.company_name]]);
                }
                users[user.email].push(jobs[user.job_id]);
            });

            const mailOptions: Mail.Options[] = [];

            Object.keys(users).forEach(email => {
                const distinctJobs = _.uniqBy(users[email], (job) => job.id);
                let plaintext = '';
                distinctJobs.forEach(job => plaintext += this.createPlainText(job) + ' ');
    
                logger.info(`Sending emails to the following user: ${email} with digest: ${plaintext}`);

                mailOptions.push({
                    to: email,
                    subject: MailingConstants.MESSAGE_DIGEST_SUBJECT, // Subject line
                    text: plaintext.trimEnd(), // plaintext body
                    html: this.createHtmlList(MailingConstants.DEFAULT_SALUTATION, MailingConstants.MESSAGE_DIGEST_TOPIC, distinctJobs),
                });
            });
            return this.mailingService.sendEmail(mailOptions);
        }
    }

    /**
     *
     * @param jobsGrouping: Dictionary Mapping of id to Get_User_Advanced query return object grouped by job id
     * @param jobKey: Job Id
     * @param job: Individual Job Instance
     * @returns Job object with the relevant fields populated to construct an email
     */
    private createJob(
        job: Get_Users_Advanced,
        companyInvestors: string[]): Jobs {
        return {
            company: {
                __typename: 'companies',
                company_investors: [...companyInvestors.map(investorName => (
                    {
                        company: null,
                        company_id: null,
                        investor: {
                            __typename: 'investors',
                            company_investors: [],
                            company_investors_aggregate: null,
                            id: 0,
                            name: investorName,
                        },
                        investor_id: 0
                    }) as Company_Investors)],
                company_investors_aggregate: null,
                id: null,
                jobs: [],
                jobs_aggregate: null,
                name: job.company_name,
            },
            company_id: 0,
            id: job.job_id,
            title: job.job_title,
            city: job.city
        };
    }
}

exports.JobsService = JobsService;