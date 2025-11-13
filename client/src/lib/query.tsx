import { useMutation, useQuery } from "@tanstack/react-query";
import { logout, register, self, signin, verifyOtp } from "./api";

export const useSignUpMutation = () => useMutation({
  mutationFn: register,
  mutationKey: ["signup"],
  onSuccess: (data) => {
    console.log("Registration successful:", data);
  },
  onError: (error) => {
    console.error("Registration failed:", error);
  }
});

export const useSignInMutation = () => useMutation({
  mutationFn: signin,
  mutationKey: ["signin"],
  onSuccess: (data) => {
    console.log("Login successful:", data);
  },
  onError: (error) => {
    console.error("Login failed:", error);
  }
});

export const useSelfQuery = () => {
  
  return useQuery({
    queryKey: ["self"],
    queryFn: self,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}

export const useOtpVerification = () => useMutation({
  mutationFn: verifyOtp,
  mutationKey: ["verify-otp"],
  onSuccess: (data) => {
    console.log("OTP verification successful:", data);
  },
  onError: (error) => {
    console.error("OTP verification failed:", error);
  }
});

export const useLogoutMutation = () => useMutation({
  mutationFn: logout,
  mutationKey: ["logout"],
  onSuccess: () => {
    console.log("Logout successful");
  },
  onError: (error) => {
    console.error("Logout failed:", error);
  }
});