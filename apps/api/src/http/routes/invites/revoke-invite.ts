import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { BadRequestError } from "../_errors/bad-request-error";

export async function revokeInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).delete('/organizations/:slug/invites/:inviteId', {
    schema: {
      tags: ['invites'],
      summary: 'Revoke aninvite',
      security: [{ bearerAuth: [] }],
      params: z.object({
        slug: z.string(),
        inviteId: z.string().uuid(),
      }),
      response: {
        204: z.null(),
      }
    },
  },
  async (request, reply) => {
    const { slug, inviteId } = request.params
   const userId = await request.getCurrentUserId()
   const { organization, membership } = await request.getUserMembership(slug)
   
   const { cannot } = getUserPermissions(userId, membership.role)
   
   if (cannot('delete', 'Invite')) {
    throw new UnauthorizedError(`You're not allowed to delete an invite.`)
   }

  
   const invite = await prisma.invite.findUnique({
    where: {
    id: inviteId,
    organizationId: organization.id,
    },
   })


   if (!invite) {
    throw new BadRequestError('Invite not found.')
   }



  await prisma.invite.delete({
   where: {
    id: inviteId,
   }
   })

   return reply.status(204).send()
  })
}