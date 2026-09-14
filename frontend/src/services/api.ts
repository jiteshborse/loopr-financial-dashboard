const API_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:5000/api";

export class ApiError extends Error {
    status: number;

    constructor(
        message: string,
        status: number
    ) {
        super(message);

        this.name = "ApiError";
        this.status = status;
    }
}

interface ApiErrorResponse {
    message?: string;
    error?: string;
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    let response: Response;

    try {
        response = await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(options.headers || {}),
                },
            }
        );
    } catch {
        throw new ApiError(
            "Unable to connect to the server. Please check your connection.",
            0
        );
    }

    const data = (await response
        .json()
        .catch(() => ({}))) as T | ApiErrorResponse;

    if (!response.ok) {
        const errorData = data as ApiErrorResponse;
        const message =
            errorData.message ??
            errorData.error ??
            "Something went wrong.";

        throw new ApiError(
            message,
            response.status
        );
    }

    return data as T;
}

export default request;