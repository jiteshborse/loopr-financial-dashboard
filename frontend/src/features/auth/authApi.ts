import {
    apiFetch
} from "../../services/api";

import type {
    AuthUser,
    LoginResponse
} from "../../types/auth";

export function login(
    email: string,
    password: string
) {
    return apiFetch<LoginResponse>(
        "/auth/login",
        {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        }
    );
}

export function logout() {
    return apiFetch<{
        message: string;
    }>("/auth/logout", {
        method: "POST"
    });
}

export function getCurrentUser() {
    return apiFetch<{
        user: AuthUser;
    }>("/auth/me");
}