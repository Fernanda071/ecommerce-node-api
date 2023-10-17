import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { Produto } from '@modules/catalogo/domain/produto/produto.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DomainException } from '@shared/domain/domain.exception';

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma);
    const produtoRepo = new ProdutoPrismaRepository(prisma);
    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
    // const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("260cdd1c-e284-4c57-87c2-bb9d4ce79bd2");

    // console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
    // const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    // console.log(todasCategorias);

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    //const existeCategoria: boolean = await categoriaRepo.existe("abe86ba0-0506-46ff-94a9-b6c7467d39e2");

    //console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    //const categoria: Categoria = Categoria.criar({
     // nome:'Cozinha'
   // });     

      //const categoriaInserida = await categoriaRepo.inserir(categoria);

    // console.log(categoriaInserida);

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
//     const categoria: Categoria = Categoria.recuperar({
//         id: "260cdd1c-e284-4c57-87c2-bb9d4ce79bd2",
//         nome: "Cozinha Americana"
//    });     

//     const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

//     console.log(atualizouCategoria)

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
//    const categoriaDeletada: boolean = await categoriaRepo.deletar("260cdd1c-e284-4c57-87c2-bb9d4ce79bd2");
    
//    console.log(categoriaDeletada);

//    const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("9fc1d69c-4867-49cc-af52-a59f0078fa41");
//    console.log(produtoRecuperado);

//    console.log(produtoRecuperado?.estaDeletado());

//     const categoria01: Categoria = Categoria.recuperar({
//         id:"4f3168a2-b701-48cb-a65e-fd9edcb87b41",
//         nome:'Sala'
//  });

//     const categoria02: Categoria = Categoria.recuperar({
//         id: "dbe86b0e-8f74-486d-ab37-08a47ff27a1d",
//         nome: 'Quarto'
//  });
//     const produto : Produto = Produto.criar({
//         nome: 'Toalha de cozinha',
//         descricao:'toalha de algodão',
//         valor:85,
//         categorias:[categoria01,categoria02]
//  });

//      const produtoInserido = await produtoRepo.inserir(produto);
//     console.log(produtoInserido);

        //  const todosProdutos: Array<Produto> = await produtoRepo.recuperarTodos();
        // console.log(todosProdutos);

        // const produto = {
        //     id: "33acfd30-2a60-4307-8865-10c1509a82f9",
        //     nome: "Toalha de Cozinha",
        //     descricao:"toalha de algodão",
        //     valor: 200
        // };
        //  const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);

        // const produtoDeletado: boolean = await produtoRepo.deletar( "33acfd30-2a60-4307-8865-10c1509a82f9")
        // console.log(produtoDeletado)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })