import { Router } from "express";
import {
  CCreatePromo,
  CDeletePromo,
  CGetAllPromos,
  CGetPromoById,
  CUpdatePromo,
} from "../controller/promo.controller";

const router = Router();

router.get("/", CGetAllPromos);
router.get("/:id", CGetPromoById);
router.post("/", CCreatePromo);
router.patch("/:id", CUpdatePromo);
router.delete("/:id", CDeletePromo);

export default router;
