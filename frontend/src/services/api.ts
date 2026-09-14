const API_URL =
    import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

interface ApiError {
    message?: string;
}

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
    });

    const data = (await response.json().catch(() => ({}))) as
        | T
        | ApiError;

    if (!response.ok) {
        throw new Error(
            (data as ApiError).message || "Something went wrong"
        );
    }

    return data as T;
}

export default request;