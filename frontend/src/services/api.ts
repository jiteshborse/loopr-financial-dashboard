const API_BASE_URL =
    import.meta.env.VITE_API_URL ??
    "http://localhost:5000/api";

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            }
        }
    );

    if (!response.ok) {
        let message = "Something went wrong.";

        try {
            const body = await response.json();

            if (body?.error) {
                message = body.error;
            }
        } catch {
            // Keep default message.
        }

        throw new Error(message);
    }

    return response.json();
}