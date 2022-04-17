// import JobModel from '../models/job.model';

// Add/Edit a job
export async function add_edit_job(req: any, res: any) {

    // get request input
    // tslint:disable-next-line:no-console
    console.log("Hi ", req.body)
    const { job } = req.body;

    // run some business logic


    /*
    // In case of errors:
    return res.status(400).json({
      message: "error happened"
    })
    */

    // success
    return res.json({
      id: "<value>"
    })

}

export async function show_job(req: any, res: any) {

    // get request input
    // tslint:disable-next-line:no-console
    console.log("Hi ", req.body)
    const { job } = req.body;

    // run some business logic


    /*
    // In case of errors:
    return res.status(400).json({
      message: "error happened"
    })
    */

    // success
    return res.json({
      id: "<value>"
    })

}