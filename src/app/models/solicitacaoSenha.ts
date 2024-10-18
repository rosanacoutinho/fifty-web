export interface SolicitacaoSenha {
    id: string,
    idCorretor: string,
    creci: string,
    nome: string,
    telefone: number,
    email: string,
    mensagem: string,
    data_solicitacao: Date,
    solicitacao: string,
    senhaTemp: string
}