import { auth } from "@/http/middlewares/auth";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { getUserPermissions } from "@/utils/get-user-permissions";
import { UnauthorizedError } from "../_errors/unauthorized-error";
import { BadRequestError } from "../_errors/bad-request-error";

export async function getProjects(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get('/organizations/:slug/projects', {
    schema: {
      tags: ['projects'],
      summary: 'Get all organization projects',
      security: [{ bearerAuth: [] }],
      params: z.object({
        slug: z.string(),
      }),
      response: {
        200: z.object({
          projects: z.array(
            z.object({
              id: z.string().uuid(),
              description: z.string(),
              name: z.string(),
              slug: z.string(),
              avatarUrl: z.string().nullable(),
              organizationId: z.string().uuid(),
              ownerId: z.string().uuid(),
              createdAt: z.date(),
              owner: z.object({
                id: z.string().uuid(),  
                name: z.string().nullable(),
                avatarUrl: z.string().nullable(),
              })
            }),
          )
        }),
      },
    },
  },
  async (request, reply) => {
    const { slug } = request.params
   const userId = await request.getCurrentUserId()
   const { organization, membership } = await request.getUserMembership(slug)
   
   const { cannot } = getUserPermissions(userId, membership.role)
   
   if (cannot('get', 'Project')) {
    throw new UnauthorizedError(`You're not allowed to see organization projects.`)
   }

   const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      slug: true,
      ownerId: true,
      avatarUrl: true,
      organizationId: true,
      createdAt: true,
      owner: {
        select: {
          id: true,
          name: true,
          avatarUrl: true,
        }
      },
    },
    where: {
     organizationId: organization.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
   })

   return reply.send({ projects })
  })
}