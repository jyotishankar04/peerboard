import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSignUpMutation } from "@/lib/query"
import { useAuthStore } from "@/store/auth"
import { useEffect } from "react"

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpFormData = z.infer<typeof signUpSchema>

const SignUpPage = () => {
  const { mutate: signUp, isPending, error, data, isSuccess } = useSignUpMutation()
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema)
  })

  const onSubmit = (data: SignUpFormData) => {
    signUp(data)
  }

  useEffect(() => {
    if (isSuccess) {
      console.log("Registration successful:", data);
      navigate(data.data.redirectEndpoint)
    }
  }, [isSuccess, data, navigate])

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-92 m-auto h-fit w-full"
    >
      <div className="p-6">
        <div className="flex flex-col mb-10">
          <h1 className="mb-1 mt-4 text-xl font-semibold">
            Create a <span className="text-primary">PeerBoard</span> Account
          </h1>
          <p>Welcome! Create an account to get started</p>
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
            <FieldGroup className="gap-4">
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Max Leiter"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </Field>
             
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
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
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
              <Field>
                <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="********"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </Field>
            </FieldGroup>

            {error && (
              <p className="text-sm text-red-500 mt-2">
                {error.message || "Registration failed. Please try again."}
              </p>
            )}
          </FieldSet>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isPending}
          >
            {isPending ? "Creating account..." : "Continue"}
          </Button>
        </div>
      </div>

      <p className="text-accent-foreground text-center text-sm">
        Have an account ?
        <Button
          asChild
          variant="link"
          className="px-2"
        >
          <Link to="/auth/login">Sign In</Link>
        </Button>
      </p>
    </form>
  )
}

export default SignUpPage