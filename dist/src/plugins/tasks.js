"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// plugin to instantiate Prisma Client
const tasksPlugin = {
    name: 'app/tasks',
    dependencies: ['prisma'],
    register: async function (server) {
        // here you can use server.app.prisma
        server.route([
            {
                method: 'POST',
                path: '/tasks',
                handler: createTaskHandler,
            },
        ]);
    },
};
exports.default = tasksPlugin;
var Status;
(function (Status) {
    Status[Status["OPEN"] = 0] = "OPEN";
    Status[Status["DOING"] = 1] = "DOING";
    Status[Status["CLOSED"] = 2] = "CLOSED";
})(Status || (Status = {}));
async function createTaskHandler(request, h) {
    const { prisma } = request.server.app;
    const payload = request.payload;
    try {
        const createdTask = await prisma.user.create({
            data: {
                title: payload.title,
                description: payload.description,
                status: payload.status
            },
            user: {
                connect: {
                    id: payload.userId
                }
            },
            select: {
                id: true,
            },
        });
        return h.response(createdTask).code(201);
    }
    catch (err) {
        console.log(err);
    }
}
//# sourceMappingURL=tasks.js.map