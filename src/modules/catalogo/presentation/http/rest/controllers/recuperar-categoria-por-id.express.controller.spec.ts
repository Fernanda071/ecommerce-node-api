import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-case/reuperar-categoria-por-id/recuperar-categoria-por-id.use-case";
import { Request, Response, response } from "express";
import { Mock, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { afterEach } from "node:test";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exception/categoria.application.exception";
import { CategoriaExceptions } from "@modules/catalogo/domain/categoria/categoria.exception";


let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recuperarCategoriaPorIdUseCaseMock: MockProxy<RecuperarCategoriaPorIdUseCase>;
let recuperarCategoriaPorIdController: RecuperarCategoriaPorIdExpressController;


describe ('Controller Express: Recuperar categoria por ID', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recuperarCategoriaPorIdUseCaseMock = mock<RecuperarCategoriaPorIdUseCase>();
        recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCaseMock);
    });
    afterEach(() =>{
        vi.restoreAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recuperarCategoriaPorIdUseCaseMock)
    })

    test('Deve Recuperar uma Categoria por UUID', async () => {

        //Dado (Given)
        const categoriaInputDTO: ICategoria = {
            id: "f0a4c2f4-18c3-429d-a74a-f73eb76d003b",
            nome: "Banheiro"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockResolvedValue(categoriaInputDTO);
        responseMock.status.mockReturnThis();

        //Quando (when)
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        //Então (then)
        expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.json).toHaveBeenCalledWith(categoriaInputDTO);
        expect(nextMock).not.toHaveBeenCalled();
    });

    test('Deve Tratar uma Exceção de Catgegoria Não Encontrada', async () =>{

        //Dado (Given)
        const categoriaInputDTO: ICategoria =  {
            id:"f0a4c2f4-18c3-429d-a74a-f73eb76d003b",
            nome: "Banheiro"
        }

        requestMock.params.id = categoriaInputDTO.id as string;
        recuperarCategoriaPorIdUseCaseMock.execute.mockRejectedValue(new CategoriaApplicationExceptions.CategoriaNaoEncontrada());
        responseMock.status.mockReturnThis();

        //Quando (when)
        await recuperarCategoriaPorIdController.recuperar(requestMock, responseMock, nextMock);

        expect(recuperarCategoriaPorIdUseCaseMock.execute).toHaveBeenCalledWith(categoriaInputDTO.id);
        expect(nextMock.mock.lastCall[0].name).toBe(CategoriaApplicationExceptions.CategoriaNaoEncontrada.name);
    });

});