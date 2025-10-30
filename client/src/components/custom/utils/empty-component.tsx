import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Construction } from "lucide-react"
import { Link } from "react-router-dom"

export function EmptyComponent() {
    return (
       <div className="w-full h-full flex justify-center items-center">
            <Empty className="">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Construction className="text-primary" />
                    </EmptyMedia>
                    <EmptyTitle>Page Under Construction</EmptyTitle>
                    <EmptyDescription>
                        We are currently working on this page
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <Link to={'/app'}>
                    <Button variant="default" className="cursor-pointer" size="lg">
                        Go Home
                    </Button>
                    </Link>
                </EmptyContent>
            </Empty>
       </div>
    )
}
