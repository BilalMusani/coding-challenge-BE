import { GetJobCompanyAndInvestorQuery, Jobs, User } from '../generated/graphql';
import { MailingConstants } from '../utils/app.constants';
import { MailingService } from './mailing.service';


export class JobsService {
    constructor(
        private mailingService: MailingService = new MailingService(),
    ) {}

    private combineInvestors(job: Partial<Jobs>): string {
        return job.company.company_investors.map(x => x.investor.name)
            .reduce((previous, curr) => (!previous ? curr : previous + "," + curr));
    }

    private createHtmlListItem(job: Partial<Jobs>): string {
        return '<li> ' + job.title + ' - ' + job.company.name + '(' + this.combineInvestors(job) + ')' + ' located in ' + '<b>' + job.city + '</b>.' + '</li>';
    }

    private createHtmlList(job: any): string {
        return  '<h1>' + MailingConstants.DEFAULT_SALUTATION + ',</h1>' +
                '<br><br>' +
                '<div>' +
                    '<p>' + MailingConstants.NEW_JOB_POSTED_TOPIC + '</p>' +
                    '<ul>' +
                        this.createHtmlListItem(job) +
                    '</ul>' +
                '</div>';
    }

    private createPlainText(job: Jobs) {
        return job.title + ' ' + job.company.name + '(' + this.combineInvestors(job) + ')' + ' located in ' + job.city;
    }

    singleJobPosting(user: Partial<User>[], jobResponse: GetJobCompanyAndInvestorQuery["jobs"]): Promise<any> {
        const job: any = jobResponse[0];
        const html: string = this.createHtmlList(job);
        const plaintext =  MailingConstants.DEFAULT_SALUTATION + ", " + MailingConstants.NEW_JOB_POSTED_TOPIC + "; " + this.createPlainText(job);
        const mailOptions = {
            to: user.map(x => x.email),
            subject: MailingConstants.NEW_JOB_POSTED_SUBJECT, // Subject line
            text: plaintext, // plaintext body
            html,
        };
        return this.mailingService.sendEmail(mailOptions);
    }
}

exports.JobsService = JobsService;