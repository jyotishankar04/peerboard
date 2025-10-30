import { Logo } from "@/components/custom/landing/logo"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
        <div className="scale-150">
            <Logo />
        </div>
        <Outlet />
    </div>
  )
}

export default AuthLayout