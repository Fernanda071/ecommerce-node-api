
import express, { Router } from 'express';
import { categoriaRouter } from '@modules/catalogo/presentation/http/rest/categoria.routes';
import { produtoRouter } from '@modules/catalogo/presentation/http/rest/produto.routes';

const apiv1Router: Router = express.Router();





apiv1Router.use(
    '/categorias',
    categoriaRouter
);

apiv1Router.use(
    '/categorias',
    function (request, response, next) {
        response.json({"entidade":"Categoria"});
    }  
);

apiv1Router.use(
    '/produtos',
    produtoRouter  
);

apiv1Router.use(
    '/usuarios',
    function (request, response, next) {
        response.json({"entidade":"Usuários"});
    }  
);

apiv1Router.use(
    '/pedidos',
    function (request, response, next) {
        response.json({"entidade":"Pedidos"});
    }  
);

export { apiv1Router }