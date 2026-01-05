import { Router } from "express";
import ParentController from "../controllers/ParentController";

const router = Router();

router.get("/", ParentController.getAll);
router.get("/:id", ParentController.getById);
router.put("/", ParentController.update);
router.delete("/:id", ParentController.delete);

export default router;
