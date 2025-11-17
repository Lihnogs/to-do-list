"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const authService_1 = require("../services/authService");
async function register(req, res, next) {
    try {
        const user = await (0, authService_1.registerUser)(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        next(err);
    }
}
async function login(req, res, next) {
    try {
        const response = await (0, authService_1.loginUser)(req.body);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
}
