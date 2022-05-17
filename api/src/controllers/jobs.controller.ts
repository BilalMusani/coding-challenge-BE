// import JobModel from '../models/job.model';

import {
  GetUsersMatchingJobQueryVariables,
  GetUsersMatchingJobQuery,
  Jobs,
  GetJobCompanyAndInvestorQuery,
  GetJobCompanyAndInvestorQueryVariables
} from "../generated/graphql";
import { apolloClient } from "../apollo";
import { GET_JOBS_COMPANY_INVESTORS, GET_USERS_MATCHING_JOB } from "../queries/jobs.queries";
import { JobsService } from "../services/jobs.service";
import { SuccessMessageConstants } from "../utils/success.messages";
import express from 'express';
import { ApolloQueryResult } from "@apollo/client/core";
import { getMessageFromApolloResult } from "../utils/errors/error.utils";
export class JobsController {
  // tslint:disable-next-line: no-empty
  constructor() { }

  /**
   *
   * @param data: ApolloQueryResult encapsulating response of graphql query
   * @param next: Middleware for handling error
   */
  private handleError(data: ApolloQueryResult<any>, next: (arg0: any) => void) {
    const message: string = getMessageFromApolloResult(data);
    return next(new Error(message));
  }

  // Triggered when a job is added in Hasura
  /**
   *
   * @param req: Event from Hasura with the Job params
   * @param res: Response object
   * @param next: Middleware for intermediate handling
   * @returns Reponse object indicating success in notifying users or failure if application encountered an error
   */

  async addEditJob(req: any, res: express.Response, next: (arg0: any) => void) {

    const jobsService: JobsService = new JobsService();
    const job: Partial<Jobs> = req.body.event.data.new;

    // Find users that fit job criteria
    const data = await apolloClient.query<GetUsersMatchingJobQuery, GetUsersMatchingJobQueryVariables>({
      query: GET_USERS_MATCHING_JOB,
      variables: { title: job.title, city: job.city }
    })

    if (data.error || data.errors || data.networkStatus === 8) {
      return this.handleError(data, next);
    }

    // Send email to the users that fit the criteria
    const matchedUsers = data.data.get_users_matching_job;

    if (matchedUsers.length > 0) {

      // Get full job description
      const jobCompanyInvestorResponse = await apolloClient.query<GetJobCompanyAndInvestorQuery, GetJobCompanyAndInvestorQueryVariables>(
        {
          query: GET_JOBS_COMPANY_INVESTORS,
          variables: { id: job.id },
          // Never cache job company data
          fetchPolicy: 'no-cache'
        });

      if (jobCompanyInvestorResponse.networkStatus === 8 || !jobCompanyInvestorResponse.data || jobCompanyInvestorResponse.error) {
        return this.handleError(data, next);
      }

      // Now send the email
      if (jobCompanyInvestorResponse.data && jobCompanyInvestorResponse.data.jobs) {
        jobsService.singleJobPosting(matchedUsers, jobCompanyInvestorResponse.data.jobs)
          .then(_success => {
            return res.json({
              "response": SuccessMessageConstants.NEW_JOB_NOTIFICATION_SUCCESS,
            });
          })
          .catch(error => {
            next(error);
          });
      }
    }
  }
}