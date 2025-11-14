import z from 'zod'

// Registration Validation
export const registerSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
}).transform(data => {
    return {
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
    }
})
export type RegisterProps = z.infer<typeof registerSchema>
// Login Validation
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
}).transform(data => {
    return {
        email: data.email.trim(),
        password: data.password.trim(),
    }
})
//OTP Validation
export const otpSchema = z.object({
    email: z.string().email(),
}).transform(data => {
    return {
        email: data.email.trim(),
    }
})

// Reset Password Validation
export const resetPasswordSchema = z.object({
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
}).transform(data => {
    return {
        password: data.password.trim(),
        confirmPassword: data.confirmPassword.trim(),
    }
})

// Onboard User Validation
export const onboardUserSchema = z.object({
    primaryGoals: z.array(z.string()).min(1, "At least one primary goal is required"),
    experienceLevel: z.string().min(1, "Experience level is required"),
    areasOfInterest: z.array(z.string()).min(1, "At least one area of interest is required"),
    dedicationHoursPerWeek: z.number().min(1, "Dedication hours per week is required"),
    currentRole: z.string().min(1, "Current role is required"),
    primaryProgrammingLanguage: z.string().min(1, "Primary programming language is required"),
}).transform(data => {
    return {
        primaryGoals: data.primaryGoals.map(goal => goal.trim()),
        experienceLevel: data.experienceLevel.trim(),
        areasOfInterest: data.areasOfInterest.map(interest => interest.trim()),
        dedicationHoursPerWeek: data.dedicationHoursPerWeek,
        currentRole: data.currentRole.trim(),
        primaryProgrammingLanguage: data.primaryProgrammingLanguage.trim(),
    }
})
export type OnboardUserProps = z.infer<typeof onboardUserSchema>