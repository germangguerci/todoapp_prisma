import Hapi from '@hapi/hapi'

// plugin to instantiate Prisma Client
const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function(server: Hapi.Server) {
    // here you can use server.app.prisma
    server.route([
        {
          method: 'POST',
          path: '/users',
          handler: createUserHandler,
        },
      ])
  },
}

export default usersPlugin

interface UserInput {
    name: string
    username: string
    email: string
    password: string

  }

async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
    const payload = request.payload as UserInput
  
    try {
      const createdUser = await prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          username: payload.username,
          password: payload.password
        },
        select: {
          id: true,
        },
      })
      return h.response(createdUser).code(201)
    } catch (err) {
      console.log(err)
    }
  }
