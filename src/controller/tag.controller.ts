import { Request, Response } from "express";
import { formatResponse } from "../utils";
import STag from "../services/tag/tag.service";
const CGetAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await STag.findAll();
    res.json(formatResponse(200, "Success", tags));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
};

const CGetTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tags = await STag.findById(id);
    if (!tags) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", tags));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
};

const CCreateTag = async (req: Request, res: Response) => {
  try {
    const newTag = await STag.create(req.body);
    res.json(formatResponse(201, "Success", newTag));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create tag" });
  }
};

const CUpdateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTag = await STag.update(id, req.body);
    if (!updatedTag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedTag));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update tag" });
  }
};

const CDeleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTag = await STag.remove(id);
    if (!deletedTag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedTag));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
};

export { CGetAllTags, CGetTagById, CCreateTag, CUpdateTag, CDeleteTag };
