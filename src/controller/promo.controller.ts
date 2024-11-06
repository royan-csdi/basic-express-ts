import { Request, Response } from "express";
import SPromo from "../services/promo/promo.service";
import { formatResponse } from "../utils";
const CGetAllPromos = async (req: Request, res: Response) => {
  try {
    const promos = await SPromo.findAll();
    res.json(formatResponse(200, "Success", promos));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve promos" });
  }
};

const CGetPromoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const promos = await SPromo.findById(id);
    if (!promos) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", promos));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve promos" });
    return;
  }
};

const CCreatePromo = async (req: Request, res: Response) => {
  try {
    const newPromo = await SPromo.create(req.body);
    res.json(formatResponse(201, "Success", newPromo));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create promo" });
  }
};

const CUpdatePromo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPromo = await SPromo.update(id, req.body);
    if (!updatedPromo) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedPromo));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update promo" });
  }
};

const CDeletePromo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPromo = await SPromo.remove(id);
    if (!deletedPromo) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedPromo));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete promo" });
  }
};

export {
  CGetAllPromos,
  CGetPromoById,
  CCreatePromo,
  CUpdatePromo,
  CDeletePromo,
};
