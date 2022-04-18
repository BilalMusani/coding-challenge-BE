import gql from "graphql-tag";


export const QUERY_JOBS = gql`
    query fetchJobs {
        jobs {
            id
            title
            city
        }
    }
`;