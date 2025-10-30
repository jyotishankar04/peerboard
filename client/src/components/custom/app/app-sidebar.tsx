// components/custom/app/app-sidebar.tsx
import {
    Sidebar,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    Activity,
    Trophy,
    BarChart3,
    TrendingUp,
    Users,
    Calendar,
    MessageCircle,
    Settings,
    HelpCircle,
    LogOutIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavUser } from "./app-user";

const sidebarData = [
    {
        title: "Main",
        items: [
            { title: "Dashboard Overview", url: "/app/dashboard", icon: LayoutDashboard },
            { title: "Activity Feed", url: "/app/activity", icon: Activity },
            { title: "Leaderboard", url: "/app/leaderboard", icon: Trophy },
        ],
    },
    {
        title: "Progress & Analytics",
        items: [
            { title: "Analytics & Insights", url: "/app/analytics", icon: BarChart3 },
            { title: "Progress Tracker", url: "/app/progress", icon: TrendingUp },
        ],
    },
    {
        title: "Social & Collaboration",
        items: [
            { title: "Teams & Groups", url: "/app/teams", icon: Users },
            { title: "Contest Calendar", url: "/app/calendar", icon: Calendar },
            { title: "Team Chat", url: "/app/chat", icon: MessageCircle },
        ],
    },
    {
        title: "Profile & Settings",
        items: [
            { title: "Settings", url: "/app/settings", icon: Settings },
            { title: "Help & Support", url: "/app/help", icon: HelpCircle },
        ],
    },
];

export function AppSidebar() {
    const location = useLocation();
    const { open } = useSidebar();
    return (
        <Sidebar variant="inset" collapsible="icon" className="border-r-0">
            <SidebarHeader className="pb-4 p-4">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-2">
                        {
                            open ? (
                                <>
                                    <LogOutIcon />
                                    <span className="font-bold">Peer
                                        <span className="text-primary">Board</span>
                                    </span>
                                </>
                            ) : (
                                <LogOutIcon />
                            )
                        }
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarGroupContent className="flex-1">
                <SidebarMenu>
                    {sidebarData.map((group) => {
                        if (group.title === "Profile & Settings") return null

                        return <SidebarGroup key={group.title}>
                            {
                                open ? (
                                    <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                                ) : (
                                    <SidebarGroupLabel className="sr-only">{group.title}</SidebarGroupLabel>
                                )
                            }
                            {group.items.map((item) => {
                                return <SidebarMenuItem key={item.title} className="mt-1">
                                    <SidebarMenuButton className={`${location.pathname === item.url ? "bg-primary text-primary-foreground" : ""}`} tooltip={
                                        {
                                            children: item.title,
                                            hidden: open
                                        }
                                    } asChild>
                                        <Link to={item.url}>
                                            <item.icon className="mr-3 h-4 w-4" />
                                            <span className="text-sm font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            }
                            )}
                        </SidebarGroup>
                    })}
                </SidebarMenu>

            </SidebarGroupContent>
            <SidebarFooter className="pt-3 border-t">
                {

                }
                <NavUser
                    type="sidebar"
                    user={{
                        name: "shadcn",
                        email: "m@example.com",
                        avatar: "/avatars/shadcn.jpg",
                    }} />
            </SidebarFooter>
        </Sidebar>
    );
}