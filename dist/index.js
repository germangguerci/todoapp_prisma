"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    /*     await prisma.user.create({
            data: {
              name: 'German',
              email: 'germangguerci@gmail.com',
              username: 'germangguerci',
              password: 'Tobogan2020!',
              tasks: {
                create: {
                    title: 'Finalizar tutorial basico',
                    description: 'Hacer encajar las piezas de prisma con una aplicación basica',
                    status: 'DOING'
                },
              },
            },
          })
      const allUsers = await prisma.user.findMany({
          include: {
              tasks: true
          }
      })
    
      console.dir(allUsers, {depth: null})
    
      const taskUpdate = await prisma.task.update({
        where: {id: 1},
        data: {
          status: 'CLOSED'
        },
      })
      console.log(taskUpdate); */
    /*   await prisma.task.create({
        data: {
          title: "Probar agregado de task",
          description: "Agregar una nueva tarea y probar funcion de agregacion",
          status: "DOING",
          user: {
            connect:  {id: 1}
          }
        }
      }) */
    const userTasks = prisma.task.aggregate({
        count: {
            id: true,
        },
        where: {
            userId: 1
        }
    });
    console.log("Usertasks", (await userTasks).count.id);
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=index.js.map