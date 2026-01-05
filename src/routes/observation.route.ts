import { Router } from "express";
import ObservationController from "../controllers/ObservationController";

const router = Router();

router.post("/", ObservationController.create);
router.get("/therapy/:therapyId", ObservationController.getByTherapyId);
router.get("/:id", ObservationController.getById);
router.put("/:id", ObservationController.update);
router.delete("/:id", ObservationController.delete);

export default router;
