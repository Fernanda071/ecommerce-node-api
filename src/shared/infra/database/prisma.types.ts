import { Prisma } from "@prisma/client";
import { type } from "os";

const produtoIncludeCategoriaPrisma = Prisma.validator<Prisma.ProdutoInclude>()(
    {
        categorias: {
            include: {
                categoria: true 
            }
        }
    }
);

type ProdutoComCategoriaPrisma = Prisma.ProdutoGetPayload<
{include: typeof produtoIncludeCategoriaPrisma;}
>

export{ produtoIncludeCategoriaPrisma, ProdutoComCategoriaPrisma }