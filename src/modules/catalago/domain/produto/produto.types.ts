//Todos os atributos/propriedades que um produto deve ter no sistema//
//Auxilia na criação de invariantes e modelos ricos

import { Categoria } from "../categoria/categoria.entity";

interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor: number
    categorias: Array<Categoria>
}

//Atributos que são necessarios para criar um produto
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos estados de um objeto
type CriarProdutoProps = Omit<IProduto, "id">;



//Atributos que são necessarios para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarProdutoProps = Required<IProduto>;

export {
    IProduto,
    CriarProdutoProps,
    RecuperarProdutoProps
}