import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

import api from '../services/api'
import { IConfig, IProduct, ICategory } from '../dtos'

interface ProductProps {
  id: string
  name: string
  preco: string
}

interface AppContextData {
  config: IConfig
  senha: string
  isAdmin: (key?: string) => boolean
  gravaConfig: (config: IConfig) => Promise<void>
  getConfig: () => Promise<IConfig>

  products: ProductProps[]
  loadProducts: () => void
  inicProducts: () => void

  categories: ICategory[]
  loadCategories: () => void
  inicCategories: () => void
}

const DEFAULT_CONFIG = {
  id: "1",
  senha_adm: "",
  qtd_mesas: "12"
}

// cria o contexto CartContext
const AppContext = createContext<AppContextData>({} as AppContextData);

interface ProviderProps {
  children: ReactNode;
}

// exporta o Provider do contexto
function AppProvider({ children }: ProviderProps) { 
  const [config, setConfig] = useState<IConfig>(DEFAULT_CONFIG)
  const [senha, setSenha] = useState('')
  const [products, setProducts] = useState<ProductProps[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])

  function isAdmin(key: string = senha) {
    if (key !== senha) {
      setSenha(key)
    }
    return key === config.senha_adm
  }

  async function gravaConfig(config_: IConfig) {
    try {
      await api.put<IConfig>('/config/1', { ...config_ })

      setConfig({...config_})
    } 
    catch(error) {
      console.log(error)
    }
  }

  async function getConfig(): Promise<IConfig> {
    try {
      const response = await api.get<IConfig>('config/1')

      if (response.data.id === "") {
        await api.post<IConfig>('/config', { ...config })
        return config

      } else {
        setConfig(response.data)        
        return response.data
      }
    }
    catch(error) {
      console.log(error)
      return config
    }
  }

  function loadProducts() {
    api.get<IProduct[]>('products', {
      params: {
        _sort: 'name',
        _order: 'asc'
      }
    })
    .then(response => {
      const lista = response.data.map(item => ({ 
        id: item.id, 
        name: item.name, 
        preco: item.preco
      }))

      setProducts([ {id: '0', name: '', preco: '0'}, ...lista ])     

    }).catch(error => {
      console.log(error)
    })
  }

  function inicProducts() {
    setProducts([])
  }

  function loadCategories() {
    api.get<ICategory[]>('categories', {
      params: {
        _sort: 'name',
        _order: 'asc'
      }
    })
    .then(response => {
      setCategories(response.data)

    }).catch(error => {
      console.log(error)
    })
  }

  function inicCategories() {
    setCategories([])
  }
  
  useEffect(() => {
    async function inic() {
      await getConfig()
      inicProducts()
    }    
    inic()
  }, [])  
  
	return (    
		<AppContext.Provider 
      value={{ 
        isAdmin, 
        senha, 
        config, 
        gravaConfig, 
        getConfig, 
        products, 
        loadProducts, 
        inicProducts,
        categories,
        loadCategories,
        inicCategories
      }}
    >
	    { children }
    </AppContext.Provider>
  )
}

// cria um hook que utiliza o contexto
function useApp(): AppContextData {
  const context = useContext(AppContext);
  return context;
}

export { AppProvider, useApp, ProductProps }