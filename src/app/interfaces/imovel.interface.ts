import { FotoImovel } from './foto-imovel.interface';
import { TipoImovel } from './tipo-imovel';
import { TipoPadraoImovel } from './tipo-padrao-imovel';

export interface Imovel {
  id: number;
  codigoReferenciaImovel: string;
  nomeImovel: string;
  preco: number;
  endereco: string;
  numero: string;
  areaterreno: string;
  fotodestaque: number;
  localizacao: string;
  complemento: string;
  descricao: string;
  nomeBairro: string;
  nomeCidade: string;
  siglaEstado: string;
  nomeEstado: string;
  dataCadastroImovel: string;
  atualizadoem: string;
  dataAtualizacaoFotos: string;
  caracteristicasImovelList: string[];
  caracteristicasEmpreendimentoList: string[];
  urlCustom: string;
  tipoImovel: TipoImovel;
  tipoPadraoImovel?: TipoPadraoImovel;
  fotoImovelList: FotoImovel[];
  paraVenda?: boolean;
  paraLocacao?: boolean;
  novos?: boolean;
  usados?: boolean;
}
