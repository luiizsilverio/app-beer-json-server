import { string } from "yup/lib/locale"

export interface ICategory {
  id: string
  name: string    
  icon?: string 
}

export interface IProduct {
  id: string
  name: string
  id_categoria: string
  preco: string  
}

export interface IConfig {
  id: string
  senha_adm: string
  qtd_mesas: string
}

export interface IComanda {
  id: string, 
  numMesa: string, 
  dtAbertura: string,
  dtFecha?: string,
  quemFechou?: string,
  fechar?: boolean,
  temNovoConsumo?: boolean
}

export interface IConsumo {
  id: string,
  id_comanda: string,
  id_product: string,
  name: string,
  qtd: string,
  vl_unit: string,
  vl_total: string,
  fechou: boolean
}

export interface IMesa {
  numMesa: number
  situacao: 'Livre' | 'Ocupada'
  fechar?: boolean
  id_comanda: string
  temNovoConsumo?: boolean
}
