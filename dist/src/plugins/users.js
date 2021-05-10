"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// plugin to instantiate Prisma Client
const usersPlugin = {
    name: 'app/users',
    dependencies: ['prisma'],
    register: async function (server) {
        // here you can use server.app.prisma
        server.route([
            {
                method: 'POST',
                path: '/users',
                handler: createUserHandler,
            },
        ]);
    },
};
exports.default = usersPlugin;
async function createUserHandler(request, h) {
    const { prisma } = request.server.app;
    const payload = request.payload;
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
        });
        return h.response(createdUser).code(201);
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=users.js.map