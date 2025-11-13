"use client"

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useLogoutMutation } from "@/lib/query"
import { useEffect } from "react"
import Loader from "../utils/loader-component"

export function NavUser({
    user,
    type = "sidebar",
}: {
    user: {
        name: string
        email: string
        avatar: string
    },
    type: "sidebar" | "header"
}) {
    const { isMobile } = useSidebar()
    const { mutateAsync: logout, isPending: logoutPending,isSuccess: logoutSuccess } = useLogoutMutation()
    useEffect(() => {
        if (logoutSuccess) {
            window.location.reload()
        }
    }, [logoutSuccess])
    useEffect(() => {
        if (logoutPending) {
            <Loader text="Logging out..." />
        }
    }, [logoutPending])
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {
                            type == "sidebar" ? (<SidebarMenuButton
                                size="lg"
                                variant={"outline"}

                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>) : (
                                <Avatar className=" h-8 w-8 rounded-lg cursor-pointer">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                            )
                        }
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : type == "sidebar" ? "right" : "top"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link to="/app/profile">
                                <DropdownMenuItem>
                                    <BadgeCheck />
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <Link to="/app/settings">
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Settings
                                </DropdownMenuItem>
                            </Link>
                            <Link to="/app/billing">
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                            </Link>
                            <Link to="/app/notifications">
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                        onClick={() => logout()}
                        disabled={logoutPending}
                        variant="destructive">
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
