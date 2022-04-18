// import JobModel from '../models/job.model';

import { QUERY_USERS, WHERE_CLAUSE } from "../queries/users";
import { apolloClient } from "../apollo";

// Triggered when a job is added in Hasura
/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function add_edit_job(req: any, res: any) {

    // tslint:disable-next-line:no-console
    const { job } = req.body;


    const result =  await apolloClient.query({
      query: QUERY_USERS(WHERE_CLAUSE('send_digest', '_eq: false')),
    });
    // run some business logic
    /*
    // In case of errors:
    return res.status(400).json({
      message: "error happened"
    })
    */

    // success
    return res.json({
      result
    })

}

// TODO: Remove
export async function show_job(req: any, res: any) {
    // success
    return res.json({
        hello: "world"
    });
}