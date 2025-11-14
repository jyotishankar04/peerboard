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

export const verifyOtp = async (data: { otp: string; userId: string, purpose: string}) => {
    return (await api.post(`/auth/verify-otp?purpose=${data.purpose}`, data)).data;
};

export const logout = async () => {
    return (await api.delete("/auth/logout")).data;
};

export const onboard = async (data: {primaryGoals: string[]; experienceLevel: string; areasOfInterest: string[]; dedicationHoursPerWeek: number; currentRole: string; primaryProgrammingLanguage: string; }) => {
    return (await api.post("/users/onboard", data)).data;
}