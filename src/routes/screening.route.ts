import { Router } from "express";
import ScreeningController from "../controllers/ScreeningController";

const router = Router();

router.post("/", ScreeningController.create);
router.get("/therapy/:therapyId", ScreeningController.getByTherapyId);
router.get("/:id", ScreeningController.getById);
router.put("/:id", ScreeningController.update);
router.delete("/:id", ScreeningController.delete);

export default router;
