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