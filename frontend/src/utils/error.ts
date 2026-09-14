import { ApiError } from "../services/api";

export function getErrorMessage(
    error: unknown
): string {
    if (error instanceof ApiError) {
        switch (error.status) {
            case 0:
                return "Unable to connect to the server. Please check your connection.";

            case 400:
                return error.message;

            case 401:
                return "Your session has expired. Please sign in again.";

            case 403:
                return "You don't have permission to perform this action.";

            case 404:
                return "The requested resource was not found.";

            case 429:
                return "Too many requests. Please try again later.";

            case 500:
                return "The server encountered an error. Please try again.";

            default:
                return error.message;
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
}