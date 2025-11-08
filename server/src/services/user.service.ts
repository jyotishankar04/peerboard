import type { PrismaClient } from "../generated/prisma/client"

export default class UserService {
    constructor(private prisma: PrismaClient) { }

    async checkExists({ email, id }: { email?: string, id?: string }): Promise<Partial<{ id: string, email: string, name: string, isVerified: boolean }> | null> {
        {
            if (id) {
                const user = await this.prisma.user.findUnique({ where: { id } })
                if(!user) return null
                return {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    isVerified: user?.isVerified
                }
            }
            if (email) {
                const user = await this.prisma.user.findUnique({ where: { email } })
                if(!user) return null
                return {
                    id: user?.id,
                    email: user?.email,
                    name: user?.name,
                    isVerified: user?.isVerified
                }
            }
            return null
        }
    }

    async getUserById(id: string) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        return user
    }
    async getUserByEmail(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } })
        return user
    }
}