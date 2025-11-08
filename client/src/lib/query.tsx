import { useMutation, useQuery } from "@tanstack/react-query";
import { register, self, signin, verifyOtp } from "./api";

export const useSignUpMutation = () => useMutation({
    mutationFn: register,
    mutationKey: ["signup"]
});

export const useSignInMutation = () => useMutation({
    mutationFn: signin,
    mutationKey: ["signin"],
    onSuccess: (data) => {
        console.log(data);
    }
});

export const useSelfQuery = () => useQuery({
    queryKey: ["self"],
    queryFn: self,
    enabled: false,
    refetchOnWindowFocus: false
});


export const useOtpVerification = () => useMutation({
    mutationFn: verifyOtp,
    mutationKey: ["verify-otp"],
});
