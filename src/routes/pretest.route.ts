import { Router } from "express";
import PretestController from "../controllers/PretestController";

const router = Router();

router.post("/", PretestController.create);
router.get("/therapy/:therapyId", PretestController.getByTherapyId);
router.get("/:id", PretestController.getById);
router.put("/:id", PretestController.update);
router.delete("/:id", PretestController.delete);

export default router;
