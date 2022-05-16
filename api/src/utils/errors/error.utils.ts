import { ApolloQueryResult } from "@apollo/client/core";
import { ErrorMessages } from "./error.messages";

export function getMessageFromApolloResult(data: ApolloQueryResult<any>): string {
    return data.error ? data.error.message : data.errors ? data.errors.map(x => x.message).reduce((prev, curr) => `${prev},${curr}`, '') : ErrorMessages.NETWORK_ERROR;
}