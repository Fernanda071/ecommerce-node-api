
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";

class CategoriaPrismaRepository
    extends PrismaRepository
    implements ICategoriaRepository<Categoria> {

    async recuperarPorUuid(uuid: string): Promise<Categoria | null> {
        const categoriaRecuperada = await this._datasource.categoria.findUnique(
            {
                where: {
                    id: uuid
                }
            }
        )
        if (categoriaRecuperada) {
            return CategoriaMap.toDomain({
                id: categoriaRecuperada.id,
                nome: categoriaRecuperada.nome
            })
        }
        return null;
    }

    async recuperarTodos(): Promise<Array<Categoria>> {
        const categoriasRecuperadas = await this._datasource.categoria.findMany();
        const categorias = categoriasRecuperadas.map(
            (categoria) => CategoriaMap.toDomain(
                {
                    id: categoria.id,
                    nome: categoria.nome
                }
            )
        )
        return categorias;
    }

   async existe(uuid: string): Promise<boolean> {
        const categoriaExistent = await this.recuperarPorUuid(uuid)
        if (categoriaExistent) {return true};
        return false;
    }
   async inserir(categoria: Categoria): Promise<Categoria> {
        const categoriaInserida = await this._datasource.categoria.create({
            data: {
                id: categoria.id,
                nome: categoria.nome
            }
        });
        return categoria;

        
    }

   async atualizar(uuid: string, categoria: Categoria): Promise<boolean> {
       const categoriaAtualizada = await this._datasource.categoria.update(
        {
            where: {id : uuid},
            data: CategoriaMap.toDTO(categoria)
        }
       );
       if (categoriaAtualizada) {return true};
       return false;
    }

    deletar(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

       

}

export { CategoriaPrismaRepository }