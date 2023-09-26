import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";
const prisma = new PrismaClient ();

async function main( ){

///////////////////
//criar categoria//
//////////////////

// let categoria: Categoria;
// categoria = Categoria.criar ({nome:'mesa'});

// ///////////////////////////////////////
// /////Persistir Categoria no Banco//////
// //////////////////////////////////////

// await prisma.categoria.create({
//     data: {
//         id: categoria.id,
//         nome: categoria.nome
//     }
// });
////////////////////////////////
//Atualizar Categoria no Banco//
////////////////////////////////

const categoriaRecuperada = await prisma.categoria.update({
        where: { id:"a2b15a09-3446-4fb1-8335-fb803712e4b8"},
        data: { nome: 'banho'},
})




////////////////////////
///Listar Categorias///
//////////////////////

const ListaCategorias = await prisma.categoria.findMany();
console.log(ListaCategorias)
}

main()
    .then(async () =>{
    await prisma.$disconnect()
    })
    .catch(async (error) =>{
        if (error instanceof DomainException) {
            console.log('Exceção de Dóminio');
            console.log(error.message);
        }
        else {
            console.log('Outras Exceções');
            console.log(error.message);
        }
        await prisma.$disconnect()
            process.exit(1)
        
    })




