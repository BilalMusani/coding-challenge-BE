import gql from "graphql-tag";

export let GET_USERS_ADVANCED = gql`
query getUsersAdvanced {
  get_users_advanced {
    city
    company_name
    email
    id
    job_id
    investor_name
    job_title
  }
}`;