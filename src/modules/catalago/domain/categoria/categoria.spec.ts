import { describe, expect, test } from 'vitest';
import { IDEntityUUIDInvalid } from '../../../../shared/domain/domain.exception';
import { Categoria } from './categoria.entity';
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from './categoria.exception';
import { CriarCategoriaProps, RecuperarCategoriaProps } from './categoria.types';
import { faker } from '@faker-js/faker';
import { before } from 'node:test';

//Suite de testes de Unidade - Entidade de Domínio

let nomeCategoriaValido: string;
let NomeCategoriaTamanhoMinInvalido: string;
let NomeCategoriaTamanhoMaxInvalido: string;
let UUIDValido: string;
let UUIDInvalido: string;

beforeAll(async () => {

    nomeCategoriaValido = faker.string.alpha({length:{min:3,max:50}});
    NomeCategoriaTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:2}});
    NomeCategoriaTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:200}});
    UUIDValido = faker.string.uuid();
    UUIDInvalido = faker.string.alpha({length:{min:1,max:20}}); 
});


describe('Entidade de Domínio da Categoria(Criar)', () => {
  
    test('Deve criar uma categoria válida', async () =>  {
 
        const categoriaValida: CriarCategoriaProps = {
            nome: nomeCategoriaValido
        };

        expect(Categoria.criar(categoriaValida))
        .to.be.instanceof(Categoria)
    })

    test('Não deve criar Categoria Com Nome Inválido - Tamanho Mínimo', async () => {
        const categoriaNomeInvalido: CriarCategoriaProps = {
            nome: NomeCategoriaTamanhoMinInvalido
        }

        expect(() => Categoria.criar(categoriaNomeInvalido))
        .toThrowError(NomeCategoriaTamanhoMinimoInvalido)
    })

    test('Não deve criar Categoria Com Nome Inválido - Tamanho Máximo', async () => {
        const categoriaNomeInvalido: CriarCategoriaProps = {
            nome: NomeCategoriaTamanhoMaxInvalido
        }

        expect(() => Categoria.criar(categoriaNomeInvalido))
        .toThrowError(NomeCategoriaTamanhoMaximoInvalido)
    })
});

describe('Entidade de Domínio: Categoria (Recuperar)', () => {

    test('Deve Recuperar Uma Categoria Válida', async () => {

        //Dado (Given)
        const categoriaValida: RecuperarCategoriaProps = {
            id: UUIDInvalido,
            nome: nomeCategoriaValido,

        };

        //Quando (When) e Então (Then)
        expect(Categoria.recuperar(categoriaValida))
            .to.be.instanceof(Categoria);

    });

    test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {

        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaIdInvalido: RecuperarCategoriaProps = {
            id: UUIDInvalido,
            nome: nomeCategoriaValido
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaIdInvalido))
            .toThrowError(IDEntityUUIDInvalid);

    });

    test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaNomeInvalido: RecuperarCategoriaProps = {
            id:UUIDValido,
            nome: NomeCategoriaTamanhoMinInvalido
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

    });

    test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que 50 caracteres
        const categoriaNomeInvalido: RecuperarCategoriaProps = {
            id: UUIDValido,
            nome: NomeCategoriaTamanhoMaxInvalido
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

    });

});
