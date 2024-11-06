import { Promo } from "@prisma/client";
import { prisma } from "../../config";

const findAll = async () => {
  return prisma.promo.findMany({
    include: {
      articles: true,
    },
  });
};

const findById = async (id: string) => {
  return prisma.promo.findUnique({
    where: {
      id,
    },
    include: {
      articles: true,
    },
  });
};

const create = async (data: Omit<Promo, "id">) => {
  return prisma.promo.create({
    data,
  });
};

const update = async (id: string, data: Partial<Promo>) => {
  return prisma.promo.update({
    where: { id },
    data,
  });
};

const remove = async (id: string) => {
  return prisma.promo.delete({
    where: { id },
  });
};

const SPromo = {
  findAll,
  findById,
  create,
  update,
  remove,
};

export default SPromo;
