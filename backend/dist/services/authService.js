"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.loginUser = loginUser;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function registerUser(data) {
    const exists = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (exists)
        throw { statusCode: 400, message: "Email já registrado!" };
    const hashed = await bcryptjs_1.default.hash(data.password, 10);
    return prisma_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed
        }
    });
}
async function loginUser(data) {
    const user = await prisma_1.default.user.findUnique({ where: { email: data.email } });
    if (!user)
        throw { statusCode: 401, message: "Credenciais inválidas!" };
    const ok = await bcryptjs_1.default.compare(data.password, user.password);
    if (!ok)
        throw { statusCode: 401, message: "Credenciais inválidas!" };
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return {
        user: { id: user.id, name: user.name, email: user.email },
        token
    };
}
