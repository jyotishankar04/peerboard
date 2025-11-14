"use client"
import { useAuthStore } from "@/store/auth"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useEffect } from "react"

import { self } from "@/lib/api"
import { useNavigate } from "react-router-dom"
import Loader from "@/components/custom/utils/loader-component"
import { toast } from "sonner"


const getSelf = async () => {
    const res = await self()
    return res.data
}
const ProtectionProvider = ({children}: {children: React.ReactNode}) => {
    const { setUser } = useAuthStore()
    const router = useNavigate()
    const { data: selfData, isLoading, isError  } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        retry: (failureCount, error) => {
            if (error instanceof AxiosError && error.response?.status === 401) return false
            return failureCount < 2
        },
    })

    useEffect(() => {
        if (selfData){
            setUser(selfData)
            toast.success('Authenticated successfully!')
            }
            
    }, [selfData, setUser])

    useEffect(() => {
        if (isError) {
            router('/auth/login')
        }
    }, [isError, router])

    if (isLoading) return <Loader  text="Authenticating..."/>


  return (
      <>{children}</>
  )
}

export default ProtectionProvider