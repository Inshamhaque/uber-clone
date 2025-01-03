"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = require("./db/db");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const captain_routes_1 = __importDefault(require("./routes/captain.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
(0, db_1.connectToDB)();
app.use('/user', userRoutes_1.default);
app.use('/captain', captain_routes_1.default);
app.listen(8080, () => {
    console.log('app running on port 3000');
});
