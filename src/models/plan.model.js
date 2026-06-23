// src/models/plan.model.js
import { prisma } from "../lib/prisma.js";

export async function listarPlanos() {
  return prisma.plan.findMany({ orderBy: { price: "asc" } });
}

export async function buscarPlanoPorId(id) {
  return prisma.plan.findUnique({ where: { id } });
}

export async function criarPlano(data) {
  return prisma.plan.create({ data });
}

export async function atualizarPlano(id, data) {
  return prisma.plan.update({ where: { id }, data });
}

export async function deletarPlano(id) {
  return prisma.plan.delete({ where: { id } });
}