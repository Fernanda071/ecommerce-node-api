interface IDatasControle {
    dataCriacao?: Date;
    dataAtualizacao?: Date;
    dataExclusao?: Date | null;
}

type keysDatasControle = keyof IDatasControle;

export { IDatasControle,keysDatasControle }