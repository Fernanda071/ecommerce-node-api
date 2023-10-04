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
        recuperarTodos(): Promise<Produto[]> {
            throw new Error("Method not implemented.");
        }

        existe(uuid: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

        inserir(entity: Produto): Promise<Produto> {
            throw new Error("Method not implemented.");
        }

        atualizar(uuid: string, entity: Partial<Produto>): Promise<boolean> {
            throw new Error("Method not implemented.");
        }

        deletar(uuid: string): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
}