import request from "../../services/api";
import type {
    AuthUser,
    LoginResponse,
} from "../../types/auth";

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    return request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });
}

export async function logout(): Promise<void> {
    await request("/auth/logout", {
        method: "POST",
    });
}

export async function getCurrentUser(): Promise<AuthUser> {
    const response = await request<{ user: AuthUser }>("/auth/me");

    return response.user;
}