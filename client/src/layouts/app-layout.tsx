// AppLayout.tsx
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/custom/app/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/custom/app/app-user";
import { ModeToggle } from "@/components/custom/utils/mode-toggle";
import { NotificationDropdown } from "@/components/custom/notifications/notification-dropdown";

const AppLayout = () => {
    return (
        <div className="w-full h-screen ">

            <SidebarProvider>
                <AppSidebar />
                <div className="flex flex-col w-full h-screen">
                    <header className="w-full flex  justify-between items-center p-2 px-6">
                        <SidebarTrigger className="" />
                        <div className="w-fit flex items-center gap-4">
                        <ModeToggle />
                        <NotificationDropdown />
                            <NavUser
                                user={{ name: "shadcn", email: "shadcn", avatar: "https://github.com/shadcn.png" }}
                                type="header"
                            />
                        </div>
                    </header>
                    <SidebarInset className="rounded-tl-xl flex-1 overflow-auto " >

                        <div className="flex flex-col h-full w-full items-center overflow-auto">
                            <Outlet />
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default AppLayout;