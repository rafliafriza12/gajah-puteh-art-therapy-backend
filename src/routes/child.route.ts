import { Router } from "express";
import ChildController from "../controllers/ChildController";

const router = Router();

router.post("/", ChildController.create);
router.get("/parent/:id", ChildController.getByParentId);
router.get("/:id", ChildController.getByChildId);
router.put("/:id", ChildController.update);
router.delete("/:id", ChildController.delete);

export default router;
