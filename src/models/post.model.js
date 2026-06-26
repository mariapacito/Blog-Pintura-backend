import { prisma } from "../lib/prisma.js";

export async function listarPosts(usuarioId) {
  return prisma.post.findMany({
    where: { usuarioId },
    orderBy: { criadoEm: "desc" },
    include: { usuario: true },
  });
}

export async function buscarPostPorId(id) {
  return prisma.post.findUnique({
    where: { id },
    include: { usuario: true },
  });
}

export async function criarPost(data) {
  return prisma.post.create({ data });
}

export async function atualizarPost(id, data) {
  return prisma.post.update({ where: { id }, data });
}

export async function deletarPost(id) {
  return prisma.post.delete({ where: { id } });
}
