import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoriaApplicationExceptions } from "../reuperar-categoria-por-id/exception/categoria.application.exception";
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";

class RecuperarTodasCategoriasUseCase implements IUseCase<void, Array<ICategoria>> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>;
 
    constructor(repositorio: ICategoriaRepository<Categoria>) {
      this._categoriaRepositorio = repositorio;
    }
 
    async execute(): Promise<Array<ICategoria>> {

        const todasCategorias: Array<Categoria> = await this._categoriaRepositorio.recuperarTodos();

        const todasCategoriasDTO = todasCategorias.map(
            (categoria) => CategoriaMap.toDTO(categoria)
        );

        return todasCategoriasDTO;
    }
}

export { RecuperarTodasCategoriasUseCase };