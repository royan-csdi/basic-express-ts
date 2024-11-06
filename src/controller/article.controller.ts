import { Request, Response } from "express";
import { formatResponse } from "../utils";
import SArticle from "../services/article/article.service";
const CGetAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await SArticle.findAll();
    res.json(formatResponse(200, "Success", articles));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

const CGetArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articles = await SArticle.findById(id);
    if (!articles) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", articles));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve articles" });
  }
};

const CCreateArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = await SArticle.create(req.body);
    res.json(formatResponse(201, "Success", newArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

const CUpdateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedArticle = await SArticle.update(id, req.body);
    if (!updatedArticle) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update article" });
  }
};

const CDeleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArticle = await SArticle.remove(id);
    if (!deletedArticle) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedArticle));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete article" });
  }
};

export {
  CGetAllArticles,
  CGetArticleById,
  CCreateArticle,
  CUpdateArticle,
  CDeleteArticle,
};
