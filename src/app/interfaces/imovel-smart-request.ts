import { TipoImovelId } from "../enums/imovel.enum";

export interface ImovelSmartRequest {
    quantidadeImoveis: number;
    tipoImovel?: TipoImovelId;
    statusImovelStr?: 'V' | 'L' | 'V;L';
    novos?: boolean;
    usados?: boolean;
    codigoReferencia?: string;
}
