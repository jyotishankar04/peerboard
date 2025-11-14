import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOtpVerification } from "@/lib/query"
import { useAuthStore } from "@/store/auth"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 characters").max(6, "OTP must be 6 characters"),
})

type OtpFormData = z.infer<typeof otpSchema>

const OTPVerificationPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  
  const userId = searchParams.get('userId') || ''
  const purpose = searchParams.get('purpose') || ''

  const { 
    mutate: verifyOtp, 
    isPending, 
    isSuccess,
    error,
    data 
  } = useOtpVerification()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema)
  })

  // Auto-focus on OTP input
  useEffect(() => {
    setFocus('otp')
  }, [setFocus])

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])
  useEffect(() => {
    if(isSuccess){
      navigate(data.redirectEndpoint || '/app/dashboard');  
      toast.success("OTP verified successfully!")
    }
  }, [isSuccess, data, setUser, navigate])

  const onSubmit = (data: OtpFormData) => {
    if (!userId) {
      console.error("User ID is missing")
      return
    }
    
    verifyOtp({
      otp: data.otp,
      userId: userId,
      purpose: purpose || '',
    })
  }




  const handleGoBack = () => {
    navigate('/auth/login')
  }

  // Format countdown to MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-92 m-auto h-fit w-full">
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 dark:bg-blue-900">
            <svg 
              className="w-8 h-8 text-blue-600 dark:text-blue-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
              />
            </svg>
          </div>
          
          <h1 className="mb-2 text-xl font-semibold">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground mb-2">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm text-muted-foreground">
            Enter the code below to verify your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
                <Input 
                  id="otp" 
                  type="text" 
                  placeholder="123456"
                  maxLength={6}
                  className="text-center text-lg font-mono tracking-widest"
                  {...register('otp', {
                    onChange: (e) => {
                      // Auto-uppercase and remove non-numeric characters
                      const value = e.target.value.replace(/[^0-9]/g, '').toUpperCase()
                      e.target.value = value
                    }
                  })}
                />
                {errors.otp && (
                  <p className="text-sm text-red-500 mt-1 text-center">
                    {errors.otp.message}
                  </p>
                )}
                
                {/* OTP input guidance */}
                <FieldDescription className="text-center">
                  Enter the 6-digit code from your email
                </FieldDescription>
              </Field>
            </FieldGroup>

            {/* Error message from API */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center dark:bg-red-900/20 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error.message || "Invalid verification code. Please try again."}
                </p>
              </div>
            )}

            {/* Resend OTP section */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?{" "}
                {canResend ? (
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto text-sm"
                    // onClick={handleResendOtp}
                  >
                    Resend code
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Resend in {formatCountdown(countdown)}
                  </span>
                )}
              </p>

              <Button 
                type="submit" 
                className="w-full"
                disabled={isPending}
              >
                {isPending ? "Verifying..." : "Verify Email"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoBack}
                disabled={isPending}
              >
                Back to Sign In
              </Button>
            </div>
          </FieldSet>
        </form>

        {/* Additional help */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
          <h3 className="text-sm font-medium mb-2">Need help?</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Check your spam or junk folder</li>
            <li>• Make sure you entered the correct email address</li>
            <li>• Contact support if you continue having issues</li>
          </ul>
        </div>
      </div>

      <p className="text-accent-foreground text-center text-sm">
        Having trouble verifying your account?
        <Button
          asChild
          variant="link"
          className="px-2"
        >
          <Link to="/support">Contact Support</Link>
        </Button>
      </p>
    </div>
  )
}

export default OTPVerificationPage