import { api } from "./axios";

export const register = async (data: { name: string; email: string; password: string; }) => {
    return (await api.post("/auth/register", data)).data;
};

export const signin = async (data: { email: string; password: string; }) => {
    return (await api.post("/auth/login", data)).data;
};

export const self = async () => {
    return (await api.get("/auth/self")).data;
};

export const verifyOtp = async (data: { otp: string; userId: string}) => {
    return (await api.post("/auth/verify-otp", data)).data;
};


