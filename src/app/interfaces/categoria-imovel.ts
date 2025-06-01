import { CategoriaImovelId } from '../enums/imovel.enum';

export interface CategoriaImovel {
  id: CategoriaImovelId;
  nome: string;
  icone?: string;
  descricao?: string;
  slug: string;
}
