"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.createServer = void 0;
const hapi_1 = __importDefault(require("@hapi/hapi"));
const status_1 = __importDefault(require("./plugins/status"));
const prisma_1 = __importDefault(require("./plugins/prisma"));
const users_1 = __importDefault(require("./plugins/users"));
const tasks_1 = __importDefault(require("./plugins/tasks"));
const server = hapi_1.default.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
});
async function createServer() {
    await server.register([status_1.default, prisma_1.default, users_1.default, tasks_1.default]);
    await server.initialize();
    return server;
}
exports.createServer = createServer;
async function startServer(server) {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
}
exports.startServer = startServer;
process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map