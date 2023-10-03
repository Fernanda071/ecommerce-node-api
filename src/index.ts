import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
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

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////
    
    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("a2b15a09-3446-4fb1-8335-fb803712e4b8");

    //console.log(categoriaRecuperada);

    /////////////////////////////////
    //Recuperar Todas as Categorias//
    /////////////////////////////////
    
    //const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    //console.log(todasCategorias);

    ////////////////////////////////
    //Verifica se Existe Categoria//
    ////////////////////////////////
    
    //const existeCategoria: boolean = await categoriaRepo.existe("abe86ba0-0506-46ff-94a9-b6c7467d39e2");

    //console.log(existeCategoria);

    /////////////////////
    //Inserir Categoria//
    /////////////////////
    
    // const categoria: Categoria = Categoria.criar({
    //   nome:'Sala e Quarto'
    // });     

    // const categoriaInserida = await categoriaRepo.inserir(categoria);

    // console.log(categoriaInserida);

    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////
    
//     const categoria: Categoria = Categoria.recuperar({
//         id: "a2b15a09-3446-4fb1-8335-fb803712e4b8",
//         nome: "Mesa"
//    });     

//     const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

//     console.log(atualizouCategoria)

    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    const categoriaDeletada: boolean = await categoriaRepo.deletar("abe86ba0-0506-46ff-94a9-b6c7467d39e2");
    
    console.log(categoriaDeletada);

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