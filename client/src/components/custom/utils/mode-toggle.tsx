import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/providers/theme-provider"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button variant="outline" className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {
                theme === "dark" ? (
                    <Sun className="text-primary" />
                ) : (
                    <Moon className="text-primary" />
                )
            }
        </Button>
    )
}