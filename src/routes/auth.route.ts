import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();

// Counselor routes
router.post("/register/counselor", AuthController.registerCounselor);
router.post("/login/counselor", AuthController.loginCounselor);

// Parent routes
router.post("/register/parent", AuthController.registerParent);
router.post("/login/parent", AuthController.loginParent);

// Password reset routes (public)
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);

// Common auth routes
router.post("/change-password", AuthController.changePassword);
router.post("/logout", AuthController.logout);
router.get("/current-user", AuthController.getCurrentUser);

export default router;
