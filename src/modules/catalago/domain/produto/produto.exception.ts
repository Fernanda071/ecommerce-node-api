import { DomainException } from "../../../../shared/domain/domain.exception";

class ProdutoExeception extends DomainException {
    constructor(message:string = 'Execeção de Domínio Genérica da Entidade Produto') {
        super(message);
        this.name = 'ProdutoException'
        this.message = message;
    }
}

class NomeProdutoTamanhoMinimoInvalido extends ProdutoExeception {
    public constructor(message:string = 'O nome do produto não possuí um tamanho mínimo válido.') {
        super(message);
        this.name = 'NomeProdutoTamanhoMinimoInvalido'
        this.message = message;
    }
}

class NomeProdutoTamanhoMaximoInvalido extends ProdutoExeception {
    public constructor(message:string = 'O nome do produto não possuí um tamanho maximo válido.') {
        super(message);
        this.name = 'NomeProdutoTamanhoMaximoInvalido'
        this.message = message;
    }
}

class DescricaoProdutoTamanhoMinimoInvalido extends ProdutoExeception {
    public constructor(message:string = 'A descrição do produto não possuí um tamanho mínimo válido.') {
        super(message);
        this.name = 'DescricaoProdutoTamanhoMinimoInvalido'
        this.message = message;
    }
}

class DescricaoProdutoTamanhoMaximoInvalido extends ProdutoExeception {
    public constructor(message:string = 'A descrição do produto não possuí um tamanho maximo válido.') {
        super(message);
        this.name = 'DescricaoProdutoTamanhoMaximoInvalido'
        this.message = message;
    }
}

class ValorMinimoProdutoInvalido extends ProdutoExeception {
    public constructor(message:string = 'O valor mínimo do produto é inválido.') {
        super(message);
        this.name = 'ValorMinimoProdutoInvalido'
        this.message = message;
    }
}

class QtdMinimaCategoriaProdutoInvalida extends ProdutoExeception {
    public constructor(message:string = 'A quantidade mínima de categorias produto é inválida.') {
        super(message);
        this.name = 'QtdMinimaCategoriaProdutoInvalida'
        this.message = message;
    }
}

class QtdMaximaCategoriaProdutoInvalida extends ProdutoExeception {
    public constructor(message:string = 'A quantidade minima de categorias produto é inválida.') {
        super(message);
        this.name = 'QtdMinimaCategoriaProdutoInvalida'
        this.message = message;
    }
}

export {
    ProdutoExeception,
    NomeProdutoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido,
    DescricaoProdutoTamanhoMaximoInvalido,
    ValorMinimoProdutoInvalido,
    QtdMinimaCategoriaProdutoInvalida,
    QtdMaximaCategoriaProdutoInvalida
}