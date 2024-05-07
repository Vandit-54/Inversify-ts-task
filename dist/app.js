"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const inversify_express_utils_1 = require("inversify-express-utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const inversify_config_1 = require("./inversify.config");
const db_1 = require("./config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, db_1.connectDB)();
// Set up InversifyExpressServer
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container, null, { rootPath: '/api' }, app);
const appConfigured = server.build();
const PORT = process.env.PORT || 3000;
appConfigured.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
//# sourceMappingURL=app.js.map