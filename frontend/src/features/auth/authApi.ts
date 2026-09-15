import request from "../../services/api";
import type {
    AuthUser,
    LoginResponse,
} from "../../types/auth";

export async function login(
    email: string,
    password: string
): Promise<LoginResponse> {
    const res = await request<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (res.token) {
        localStorage.setItem("accessToken", res.token);
    }

    return res;
}

export async function logout(): Promise<void> {
    try {
        await request("/auth/logout", {
            method: "POST",
        });
    } finally {
        localStorage.removeItem("accessToken");
    }
}

export async function getCurrentUser(): Promise<AuthUser> {
    const response = await request<{ user: AuthUser }>("/auth/me");

    return response.user;
}