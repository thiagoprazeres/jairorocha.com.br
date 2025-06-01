import { CategoriaImovel } from '../interfaces/categoria-imovel';
import { TipoImovel } from '../interfaces/tipo-imovel';
import {
  CategoriaImovelId,
  TipoImovelId,
  TipoPadraoImovelId,
  TipoTerrenoLoteamentoId,
} from '../enums/imovel.enum';
import { TipoTerrenoLoteamento } from '../interfaces/tipo-terreno-loteamento';
import { TipoPadraoImovel } from '../interfaces/tipo-padrao-imovel';

export const categoriasImoveis: CategoriaImovel[] = [
  {
    id: CategoriaImovelId.Residencial,
    nome: 'Residencial',
    icone: 'icons/residencial.svg',
    descricao:
      'Para quem busca um lar, tranquilidade ou espaço para viajar com a família.',
    slug: 'residencial',
  },
  {
    id: CategoriaImovelId.Comercial,
    nome: 'Comercial',
    icone: 'icons/comercial.svg',
    descricao:
      'Para investidores e empreendedores que desejam expandir negócios ou gerar renda.',
    slug: 'comercial',
  },
];

export const tiposImoveis: TipoImovel[] = [
  {
    id: TipoImovelId.Apartamento,
    nome: 'Apartamento',
    descricao: 'Moradia vertical com diferentes tamanhos e configurações.',
    slug: 'apartamento',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Residencial],
  },
  {
    id: TipoImovelId.Casa,
    nome: 'Casa',
    descricao: 'Moradia horizontal com área externa e privacidade.',
    slug: 'casa',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Residencial],
  },
  // {
  //   id: TipoImovelId.FlatStudio,
  //   nome: 'Flat, studio',
  //   descricao: 'Moradia compacta e moderna para quem busca praticidade.',
  //   slug: 'flat-studio',
  //   categoriaImovel: categoriasImoveis[CategoriaImovelId.Residencial],
  // },
  {
    id: TipoImovelId.TerrenoLoteamento,
    nome: 'Terreno, loteamento',
    descricao: 'Terrenos para construção ou loteamentos residenciais.',
    slug: 'terreno-loteamento',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Residencial],
  },
  {
    id: TipoImovelId.GalpaoPredioComercial,
    nome: 'Galpão, prédio comercial',
    descricao:
      'Estruturas amplas para logística, indústria ou escritórios corporativos.',
    slug: 'galpao-predio-comercial',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Comercial],
  },
  {
    id: TipoImovelId.SalaCasaComercial,
    nome: 'Sala, casa comercial',
    descricao:
      'Espaços profissionais ideais para startups, consultórios ou pequenas empresas.',
    slug: 'sala-casa-comercial',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Comercial],
  },
  {
    id: TipoImovelId.Loja,
    nome: 'Loja',
    descricao:
      'Pontos comerciais em locais de alto fluxo para seu negócio brilhar.',
    slug: 'loja',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Comercial],
  },
  {
    id: TipoImovelId.Rural,
    nome: 'Rural',
    descricao: 'Imóveis localizados em áreas rurais com grande área de terra.',
    slug: 'rural',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Residencial],
  },
  {
    id: TipoImovelId.HotelPousada,
    nome: 'Hotel, pousada',
    descricao: 'Imóveis prontos para receber turistas e viajantes.',
    slug: 'hotel-pousada',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Comercial],
  },
  {
    id: TipoImovelId.RestauranteLanchonete,
    nome: 'Restaurante, lanchonete',
    descricao:
      'Espaços equipados ou personalizáveis para empreendimentos gastronômicos.',
    slug: 'restaurante-lanchonete',
    categoriaImovel: categoriasImoveis[CategoriaImovelId.Comercial],
  },
];

export const tipoTerrenosLoteamentos: TipoTerrenoLoteamento[] = [
  {
    id: TipoTerrenoLoteamentoId.Praia,
    nome: 'Praia',
    slug: 'praia',
    descricao: 'Terrenos para construção ou loteamentos na praia.',
  },
  {
    id: TipoTerrenoLoteamentoId.Campo,
    nome: 'Campo',
    slug: 'campo',
    descricao: 'Terrenos para construção ou loteamentos no campo.',
  },
  {
    id: TipoTerrenoLoteamentoId.Urbano,
    nome: 'Urbano',
    slug: 'urbano',
    descricao: 'Terrenos para construção ou loteamentos urbanos.',
  },
];

export const tipoPadraoImoveis: TipoPadraoImovel[] = [
  {
    id: TipoPadraoImovelId.MCMV,
    nome: 'MCMV',
    slug: 'mcmv',
    descricao: 'Imóveis com padrão MCMV.',
  },
  {
    id: TipoPadraoImovelId.Popular,
    nome: 'Popular',
    slug: 'popular',
    descricao: 'Imóveis com padrão Popular.',
  },
  {
    id: TipoPadraoImovelId.AltoPadrao,
    nome: 'Alto Padrão',
    slug: 'alto-padrao',
    descricao: 'Imóveis com padrão Alto Padrão.',
  },
  {
    id: TipoPadraoImovelId.MedioPadrao,
    nome: 'Médio Padrão',
    slug: 'medio-padrao',
    descricao: 'Imóveis com padrão Médio Padrão.',
  },
];
