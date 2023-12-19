import express from "express"
import { recuperarTodosProdutosController } from "./controllers";

export const produtoRouter = express.Router();

produtoRouter.get(
    '/',
    (request, response, next) =>  recuperarTodosProdutosController.recuperar(request, response, next)
);