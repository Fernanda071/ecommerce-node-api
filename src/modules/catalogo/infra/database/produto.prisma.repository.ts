import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

 
    
    
    class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto>{

      
        async recuperarPorUuid(uuid: string): Promise<Produto | null> {
            const produtoRecuperado = await this._datasource.produto.findUnique({
                where: {
                    id: uuid,
                },
                include: produtoIncludeCategoriaPrisma
            });

                if (produtoRecuperado){
                    return ProdutoMap.fromPrismaModelToDomain(produtoRecuperado);
                    }
                    return null;
               
                }   

        async recuperarTodos(): Promise<Produto[]> {
            const produtosRecuperados = await this._datasource.produto.findMany({
                include: produtoIncludeCategoriaPrisma
            });

            const produtos: Array<Produto> = [];

            if(produtosRecuperados.length > 0){
                produtosRecuperados.map((produto) => {
            produtos.push(ProdutoMap.fromPrismaModelToDomain(produto));
                });
            }
         return produtos;
        }

        existe(uuid: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

        async inserir(produto: Produto): Promise<Produto> {
            const produtoInserido = await this._datasource.produto.create({
                data: {
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                    categorias: {
                        create: produto.categorias.map((categoria) => { return {categoriaId: categoria.id} })
                    }
                }
           });
           return produto;
        }

        atualizar(uuid: string, entity: Partial<Produto>): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

        deletar(uuid: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
}

export { ProdutoPrismaRepository}