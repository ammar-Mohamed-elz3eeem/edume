"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const port = process.env.PORT || 5050;
async function initServer(app) {
    try {
        await db_1.default.authenticate();
        // await sequelize.sync({ force: true });
        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => {
                console.log(`🚀 Server is running on port http://localhost:${port}/`);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = initServer;
