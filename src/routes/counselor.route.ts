import { Router } from "express";
import CounselorController from "../controllers/CounselorController";

const router = Router();

router.get("/", CounselorController.getAll);
router.get("/:id", CounselorController.getById);
router.put("/", CounselorController.update);
router.delete("/:id", CounselorController.delete);

export default router;
