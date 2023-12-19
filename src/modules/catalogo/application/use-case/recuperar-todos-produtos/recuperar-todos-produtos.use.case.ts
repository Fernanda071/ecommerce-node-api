import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class RecuperarTodosProdutosUseCase implements IUseCase<void, Array<IProduto>> {
    private _produtoRepositorio: IProdutoRepository<Produto>;

    constructor(repository: IProdutoRepository<Produto>){
        this._produtoRepositorio = repository;
    }

    async execute(): Promise<IProduto[]> {
        const todosProdutos: Array<Produto> = await this._produtoRepositorio.recuperarTodos();

        const todosProdutosDTO = todosProdutos.map((produto) => ProdutoMap.toDTO(produto));

        return todosProdutosDTO;
    }
}