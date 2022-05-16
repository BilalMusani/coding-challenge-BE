import gql from "graphql-tag";


export const GET_USERS_MATCHING_JOB = gql`
query getUsersMatchingJob($title: String!, $city: String!) {
    get_users_matching_job(args: {title: $title, city: $city}) {
      cities
      email
      id
      send_digest
    }
}`;

export const GET_JOBS_COMPANY_INVESTORS = gql`
query getJobCompanyAndInvestor($id: Int!) {
    jobs(where: {id: {_eq: $id}}) {
      company {
        id
        name
        company_investors {
          investor {
            id
            name
          }
        }
      }
      id
      title
      city
    }
}`;