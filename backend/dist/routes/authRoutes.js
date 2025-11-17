"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const zod_1 = require("zod");
const validateMiddleware_1 = require("../middleware/validateMiddleware");
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.email(),
        password: zod_1.z.string().min(6)
    })
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email(),
        password: zod_1.z.string()
    })
});
router.post("/register", (0, validateMiddleware_1.validate)(registerSchema), authController_1.register);
router.post("/login", (0, validateMiddleware_1.validate)(loginSchema), authController_1.login);
exports.default = router;
