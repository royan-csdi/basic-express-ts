import { Router } from "express";
import {
  CGetHistory,
  CListOperations,
  CMathOperations,
  CRemoveByIndex,
} from "../controller/math.controller";
import { validateRequest } from "../middlewares";

const router = Router();

router.get("/list", CListOperations);
router.get("/", validateRequest, CMathOperations);
router.get("/:valueA/:operation/:valueB", validateRequest, CMathOperations);
router.post("/", validateRequest, CMathOperations);
router.get("/history", CGetHistory);
router.delete("/history/:id", CRemoveByIndex);

export default router;
