import type { PrismaClient } from "../generated/prisma/client";

class SessionService{
    constructor(private prisma: PrismaClient){}
    async getAllSessions({ id }: { id: string }) {
        const sessions = await this.prisma.session.findMany({ where: { userId: id } });
        return sessions;
    }

    async getSession(sessionId: string) {
        const session = await this.prisma.session.findUnique({ where: { id: sessionId } });
        return session;
    }

    async deleteSession(sessionId: string) {
        await this.prisma.session.delete({ where: { id: sessionId } });
    }
}

export default SessionService