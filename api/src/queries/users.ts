import gql from "graphql-tag";

export let QUERY_USERS = (condition: string) => gql`
    query fetchUsers {
        user (where: ({${condition}}) {
            email
            id
            keywords
            send_digest
            cities
        }
    }
`;

export let WHERE_CLAUSE = (col: string, condition: any) => `{${col}: {${condition}}}`