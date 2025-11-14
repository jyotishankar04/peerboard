import { cn } from '@/lib/utils'
import { LogOutIcon } from 'lucide-react';

export const Logo = ({ className }: { className?: string; uniColor?: boolean }) => {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <LogOutIcon />
            <span className="font-bold">Peer
                <span>Board</span>
            </span>
        </div>
    )
}

