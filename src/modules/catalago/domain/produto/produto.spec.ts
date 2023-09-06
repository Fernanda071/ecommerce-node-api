
import { Categoria } from "../categoria/categoria.entity";
import { CriarProdutoProps } from "./produto.types";
import { expect, test, beforeAll, describe } from "vitest";
import { Produto } from "./produto.entity";
import { DescricaoProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido, NomeProdutoTamanhoMinimoInvalido, QtdMaximaCategoriaProdutoInvalida, QtdMinimaCategoriaProdutoInvalida, ValorMinimoProdutoInvalido } from "./produto.exception";
import { faker } from '@faker-js/faker';

let NomeProdutoValido: string;
let NomeProdutoTamanhoMinInvalido: string;
let NomeProdutoTamanhoMaxInvalido: string;
let DescricaoProdutoValido: string;
let descricaoProdutoMinInvalido: string;
let descricaoProdutoMaxInvalido: string;
let ValorProdutoValido: number;
let ValorMinProdutoInvalido: number;
let CategoriasValidas: Array<Categoria>;
let CategoriasQtdMinInvalidas: Array<Categoria>;
let CategoriasQtdMaxInvalidas: Array<Categoria>;

beforeAll(async () => {

    NomeProdutoValido = faker.string.alpha({length:{min:5,max:50}});
    NomeProdutoTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:4}});
    NomeProdutoTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:51}});
    DescricaoProdutoValido = faker.string.alpha({length:{min:10,max:200}});
    descricaoProdutoMinInvalido = faker.string.alpha({length:{min:0,max:9}});
    descricaoProdutoMaxInvalido = faker.string.alpha({length:{min:201,max:201}});
    ValorProdutoValido = faker.number.int({min: 1,max: 2000});
    ValorMinProdutoInvalido = faker.number.int({min: -10,max: 0});


    const catetegoriaValida01 = Categoria.criar({nome: faker.string.alpha({length: {min:3,max: 50}})});
    const catetegoriaValida02 = Categoria.criar({nome: faker.string.alpha({length: {min:3,max: 50}})});
    const catetegoriaValida03 = Categoria.criar({nome: faker.string.alpha({length: {min:3,max: 50}})});
    const catetegoriaValida04 = Categoria.criar({nome: faker.string.alpha({length: {min:3,max: 50}})});
    CategoriasValidas = faker.helpers.arrayElements<Categoria>([catetegoriaValida01, catetegoriaValida02, catetegoriaValida03], {min: 1, max: 3});
    CategoriasQtdMinInvalidas = [];
    CategoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([catetegoriaValida01, catetegoriaValida02, catetegoriaValida03, catetegoriaValida04], {min: 4, max: 3});
});
describe ('Entidade de domínio: Criar Produto', () => {
    test('Deve criar um produto válido', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoValido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        expect(Produto.criar(produtoValido))
            .to.be.instanceOf(Produto);
    });

    test('Não deve criar um produto com nome inválido(Tamanho Mínimo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toa',
            descricao: 'Toalha de algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);
    });

    test('Não deve criar um produto com nome inválido(Tamanho Maxima)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toahsagaydajçl´lkpouoyohjpddifjpsosaioyudyfosdhshdo',
            descricao: 'Toalha de algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);
    });

    test('Não deve criar um produto com Descrição inválida(Tamanho Mínimo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Algodão',
            valor: 10,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);
    });

    test('Não deve criar um produto com Descrição inválida(Tamanho Maximo)', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'hkgjaakjjkjfãjpdjfpieugerupgojrepigjpiugpiroeiutiprupisdpgkhaglhaklghLKHPKIJGKPHGFHGJLFHGAHKLDHGGhghfhgffghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhgggggggggggggggggggggggggggggggggggggfffffffffffff',
            valor: 10,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);
    });

    test('Não deve criar um produto com valor minimo inválido', async () => {

        let categoriasValidas: Array<Categoria> = [];
        categoriasValidas.push(Categoria.criar({ nome: 'Banho'}));

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de banho',
            valor: -50,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ValorMinimoProdutoInvalido);
    });

     test('Não deve criar um produto com número minimo de categorias inválido', async () => {

        let categoriasQTdMinInvalidas: Array<Categoria> = [];

        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de banho',
            valor: 10,
            categorias: categoriasQTdMinInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMinimaCategoriaProdutoInvalida);
    });

     test('Não deve criar um produto com número maximo de categorias inválido', async () => {

        let categoriasQTdMaxInvalidas: Array<Categoria> = [];
        categoriasQTdMaxInvalidas.push(Categoria.criar({ nome : 'Cama'}));
        categoriasQTdMaxInvalidas.push(Categoria.criar({ nome : 'Mesa'}));
        categoriasQTdMaxInvalidas.push(Categoria.criar({ nome : 'Banho'}));
        categoriasQTdMaxInvalidas.push(Categoria.criar({ nome : 'Enxoval'}));
       
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'Toalha',
            descricao: 'Toalha de banho',
            valor: 10,
            categorias: categoriasQTdMaxInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMaximaCategoriaProdutoInvalida);
    });
})