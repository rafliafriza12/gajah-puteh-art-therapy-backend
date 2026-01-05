import { Router } from "express";
import PosttestController from "../controllers/PosttestController";

const router = Router();

router.post("/", PosttestController.create);
router.get("/therapy/:therapyId", PosttestController.getByTherapyId);
router.get("/:id", PosttestController.getById);
router.put("/:id", PosttestController.update);
router.delete("/:id", PosttestController.delete);

export default router;
