import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, logout, onboard, register, self, signin, updateUser, verifyOtp } from "./api";
import type { UpdateUserSchema, UserProfile } from "@/types";
import { toast } from "sonner";
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
export const useOnboardMutation = () => useMutation({
  mutationFn:onboard,
  mutationKey: ["onboard"],
  onSuccess: (data) => {
    console.log("Onboarding successful:", data);
  },
  onError: (error) => {
    console.error("Onboarding failed:", error);
  }
})

// User and Settings Queries and Mutations

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useUpdateUserMutation = () =>{
  const queryClient = useQueryClient();
  return useMutation({
  mutationKey: ["update-user"],
  mutationFn: async (data: UpdateUserSchema) => {
    return await updateUser(data);
  },
  onSuccess: (data) => {
    queryClient.setQueryData(["user-profile"], data);
    queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    toast.success("User updated successfully");
  },
  onError: (error) => {
    console.error("Update user failed:", error);
  }
});
} 
