import { IDatasControle, keysDatasControle } from "@shared/domain/datas.types";

//Todos os atributos/propriedades que uma categoria deve ter no sistema

//Auxilia na criação de invariantes e modelos ricos
interface ICategoria extends IDatasControle {
    id?: string;
    nome: string;
}

type CriarCategoriaProps = Omit<ICategoria, "id" | keysDatasControle>;

type RecuperarCategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
};

export {ICategoria, CriarCategoriaProps, RecuperarCategoriaProps}