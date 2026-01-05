import { Router } from "express";
import authRouter from "./auth.route";
import counselorRouter from "./counselor.route";
import parentRouter from "./parent.route";
import childRouter from "./child.route";
import therapyRouter from "./therapy.route";
import observationRouter from "./observation.route";
import pretestRouter from "./pretest.route";
import posttestRouter from "./posttest.route";
import screeningRouter from "./screening.route";

const router = Router();

// Mount all routes
router.use("/auth", authRouter);
router.use("/counselor", counselorRouter);
router.use("/parent", parentRouter);
router.use("/child", childRouter);
router.use("/therapy", therapyRouter);
router.use("/observation", observationRouter);
router.use("/pretest", pretestRouter);
router.use("/posttest", posttestRouter);
router.use("/screening", screeningRouter);

export default router;
