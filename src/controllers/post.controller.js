import * as PostModel from "../models/post.model.js";

// GET /api/posts
export async function listar(req, res) {
  try {
    const posts = await PostModel.listarPosts();
    return res.json(posts);
  } catch (error) {
    console.error("Erro ao listar posts:", error);
    return res.status(500).json({ error: "Erro interno ao listar os posts." });
  }
}

// GET /api/posts/:id
export async function buscar(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const post = await PostModel.buscarPostPorId(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }
    return res.json(post);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return res.status(500).json({ error: "Erro interno ao buscar o post." });
  }
}

// POST /api/posts
export async function criar(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const { titulo, descricao } = req.body;
    const usuarioId = req.user.id;

    const tituloLimpo = String(titulo ?? "").trim();
    if (!tituloLimpo) {
      return res.status(400).json({ error: "O campo 'titulo' é obrigatório." });
    }

    const post = await PostModel.criarPost({
      titulo: tituloLimpo,
      descricao: descricao ? String(descricao).trim() : null,
      usuarioId,
    });

    return res.status(201).json(post);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return res.status(500).json({ error: "Erro interno ao criar o post." });
  }
}

// PUT /api/posts/:id
export async function atualizar(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const post = await PostModel.buscarPostPorId(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    if (post.usuarioId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para editar este post." });
    }

    const { titulo, descricao } = req.body;
    const dadosAtualizados = {};

    if (titulo !== undefined) {
      const tituloLimpo = String(titulo).trim();
      if (!tituloLimpo) {
        return res.status(400).json({ error: "O campo 'titulo' não pode ser vazio." });
      }
      dadosAtualizados.titulo = tituloLimpo;
    }

    if (descricao !== undefined) {
      dadosAtualizados.descricao = descricao ? String(descricao).trim() : null;
    }

    const atualizado = await PostModel.atualizarPost(id, dadosAtualizados);
    return res.json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    return res.status(500).json({ error: "Erro interno ao atualizar o post." });
  }
}

// DELETE /api/posts/:id
export async function deletar(req, res) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const post = await PostModel.buscarPostPorId(id);
    if (!post) {
      return res.status(404).json({ error: "Post não encontrado." });
    }

    if (post.usuarioId !== req.user.id) {
      return res.status(403).json({ error: "Você não tem permissão para excluir este post." });
    }

    await PostModel.deletarPost(id);
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return res.status(500).json({ error: "Erro interno ao deletar o post." });
  }
}
