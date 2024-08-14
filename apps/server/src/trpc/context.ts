import { requestContext } from '@fastify/request-context';
import { TRPCError } from '@trpc/server';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export async function createContext({ req, res }: CreateFastifyContextOptions) {
    const user = requestContext.get('user');
    if (!user) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Unauthorized',
        });
    }
    return {
        req,
        res,
        user,
        aiService: req.server.aiService,
        dbPool: req.server.dbPool,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
