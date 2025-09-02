// Helper enums for ids

export enum CategoriaImovelId {
  Residencial = 0,
  Comercial = 1,
}

export enum TipoImovelId {
  // Residencial
  Apartamento = 1,
  Casa = 2,
  Rural = 7,
  FlatStudio = 8,

  // Comercial
  GalpaoPredioComercial = 5,
  SalaCasaComercial = 6,
  Loja = 3,
  HotelPousada = 9,
  RestauranteLanchonete = 10,
  
  // Residencial ou Comercial
  TerrenoLoteamento = 4,
}

export enum TipoTerrenoLoteamentoId {
  Praia = 0,
  Campo = 1,
  Urbano = 2,
}

export enum TipoPadraoImovelId {
  MCMV = 0,
  Popular = 1,
  AltoPadrao = 3,
  MedioPadrao = 2,
}
