import { Entity } from "../../../../shared/domain/entity";
import { ProdutoMap } from "../../mappers/produto.map";
import { Categoria } from "../categoria/categoria.entity";
import { NomeCategoriaTamanhoMaximoInvalido } from "../categoria/categoria.exception";
import { DescricaoProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMinimoInvalido, QtdMaximaCategoriaProdutoInvalida, QtdMinimaCategoriaProdutoInvalida, ValorMinimoProdutoInvalido } from "./produto.exception";
import { CriarProdutoProps, IProduto, RecuperarProdutoProps } from "./produto.types";

class Produto extends Entity<IProduto> implements IProduto {
    private _nome: string;
    private _descricao: string;
    private _valor: number;
    private _categorias: Array<Categoria>;

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value.trim().length < 5 ) {
            throw new NomeProdutoTamanhoMinimoInvalido();
        }
        if (value.trim().length > 50 ) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }
        this._nome = value;
        
    }
    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(value: string) {
        if (value.trim().length < 10 ) {
            throw new DescricaoProdutoTamanhoMinimoInvalido();
        }
        if (value.trim().length > 200 ) {
            throw new DescricaoProdutoTamanhoMaximoInvalido();
        }
        this._descricao = value;
        
    }

    
    public get valor(): number {
        return this._valor;
    }

    private set valor(value: number) {
        if (value < 0 ) {
            throw new ValorMinimoProdutoInvalido();
        }
        this._valor = value;
    }

    public get categorias(): Array<Categoria> {
        return this._categorias;
    }

    private set categorias(value: Array<Categoria>) {
        if (value.length < 1 ) {
            throw new QtdMinimaCategoriaProdutoInvalida();
        }
        if (value.length > 3 ) {
            throw new QtdMaximaCategoriaProdutoInvalida();
        }
        this.categorias = value;
        
    }

    private constructor(produto: IProduto) {
        super(produto.id);
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.valor = produto.valor;
        this.categorias = produto.categorias;
    }

    public static criar(props: CriarProdutoProps): Produto {
        return new Produto(props);
    }
    public static recuperar(props: RecuperarProdutoProps): Produto {
        return new Produto(props);
    }

    public toDTO(): IProduto {
        return ProdutoMap.toDTO(this);
    }
}

export { Produto }


