import { Router } from "express";
import TherapyController from "../controllers/TherapyController";

const router = Router();

router.post("/", TherapyController.create);
router.get("/", TherapyController.getAll);
router.get("/counselor", TherapyController.getByCounselorId);
router.get("/parent", TherapyController.getByParentId);
router.get("/child/:id", TherapyController.getByChildId);
router.get("/:id", TherapyController.getById);
router.put("/:id", TherapyController.update);
router.delete("/:id", TherapyController.delete);

export default router;
