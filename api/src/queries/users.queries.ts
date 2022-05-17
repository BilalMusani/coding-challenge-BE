import gql from "graphql-tag";

export let GET_USERS_ADVANCED_QUERY = gql`
query getUsersAdvanced {
  get_users_advanced {
    city
    company_name
    date_added
    email
    id
    investor_name
    job_id
    job_title
  }
}`;