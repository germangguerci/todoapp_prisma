import { Status } from '.prisma/client'
import Hapi from '@hapi/hapi'

// plugin to instantiate Prisma Client
const tasksPlugin = {
  name: 'app/tasks',
  dependencies: ['prisma'],
  register: async function(server: Hapi.Server) {
    // here you can use server.app.prisma
    server.route([
        {
          method: 'POST',
          path: '/tasks',
          handler: createTaskHandler,
        },
      ])
  },
}

export default tasksPlugin

interface TaskInput {
    title: string
    description: string
    status: Status
    userId: number
  }

async function createTaskHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const payload = request.payload as TaskInput
  
    try {
      const createdTask = await prisma.task.create({
        data: {
          title: payload.title,
          description: payload.description,
          status: payload.status,
          userId: payload.userId
        },
        select: {
          id: true,
        },
      })
      return h.response(createdTask).code(201)
    } catch (err) {
      console.log(err)
    }
  }
