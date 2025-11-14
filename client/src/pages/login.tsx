import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSelfQuery, useSignInMutation } from "@/lib/query"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required")
})

type LoginFormData = z.infer<typeof loginSchema>

const LoginPage = () => {
    const { setUser } = useAuthStore()
    const { data, refetch, isLoading: isSelfLoading, isSuccess: isSelfSuccess } = useSelfQuery()
    const { mutate: signIn, isPending, error, isSuccess } = useSignInMutation()
    const router = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    useEffect(() => {
        if (isSuccess) {
            // Redirect to onboarding or verification page
            refetch()
            if (isSelfSuccess) {
                toast.success("Login successful")
                setUser(data.user)
                router('/app/dashboard')
            }
        }
    }, [isSuccess, data, setUser, refetch, isSelfSuccess, router])

    const onSubmit = (data: LoginFormData) => {
        signIn(data)
    }

    if (isSelfLoading) {
        return <div>Loading...</div>
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-92 m-auto h-fit w-full"
        >
            <div className="p-6">
                <div className="flex flex-col mb-10">
                    <h1 className="mb-1 mt-4 text-xl font-semibold">
                        Sign In to <span className="text-primary">PeerBoard</span>
                    </h1>
                    <p className="text-sm">Welcome back! Sign in to continue</p>
                </div>

                <div className="mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="0.98em"
                            height="1em"
                            viewBox="0 0 256 262"
                        >
                            <path
                                fill="#4285f4"
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            />
                            <path
                                fill="#34a853"
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            />
                            <path
                                fill="#fbbc05"
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                            />
                            <path
                                fill="#eb4335"
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            />
                        </svg>
                        <span>Google</span>
                    </Button>
                </div>

                <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <hr className="border-dashed" />
                    <span className="text-muted-foreground text-xs">Or continue With</span>
                    <hr className="border-dashed" />
                </div>

                <div className="space-y-6">
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="max.leiter@example.com"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                                )}
                            </Field>
                        </FieldGroup>

                        {error && (
                            <p className="text-sm text-red-500 mt-2">
                                {error.message || "Login failed. Please try again."}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending}
                        >
                            {isPending && <Spinner />}
                            {isPending ? "Signing in..." : "Continue"}
                        </Button>
                    </FieldSet>
                </div>
            </div>

            <p className="text-accent-foreground text-center text-sm">
                Don't have an account ?
                <Button
                    asChild
                    variant="link"
                    className="px-2"
                >
                    <Link to="/auth/signup">Create account</Link>
                </Button>
            </p>
        </form>
    )
}

export default LoginPage