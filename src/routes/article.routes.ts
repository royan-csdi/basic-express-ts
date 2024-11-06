import { Router } from "express";
import {
  CCreateArticle,
  CDeleteArticle,
  CGetAllArticles,
  CGetArticleById,
  CUpdateArticle,
} from "../controller/article.controller";

const router = Router();

router.get("/", CGetAllArticles);
router.get("/:id", CGetArticleById);
router.post("/", CCreateArticle);
router.patch("/:id", CUpdateArticle);
router.delete("/:id", CDeleteArticle);

export default router;
