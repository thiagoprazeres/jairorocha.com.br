import { CategoriaImovel } from './categoria-imovel';
import { TipoImovelId } from '../enums/imovel.enum';

export interface TipoImovel {
  id: TipoImovelId;
  nome: string;
  descricao?: string;
  slug: string;
  categoriaImovel: CategoriaImovel;
}
