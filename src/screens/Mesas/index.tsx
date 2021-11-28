import React, { useEffect, useState, useCallback } from 'react'
import { useRoute, useFocusEffect } from '@react-navigation/native'
// import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from 'styled-components'
import { Modal } from 'react-native'

import api from '../../services/api'
import { useApp } from '../../contexts'
import { IComanda, IMesa } from '../../dtos'
import { Container } from './styles'

import { Loading } from '../../components/Loading'
import { Header } from '../../components/Header'
import { Mesa } from '../../components/Mesa'
import { Pedido } from '../Pedido'
import { Fechar } from '../Fechar'
import { PedeSenha } from '../PedeSenha'

interface ITamanhoMesa {
  width: number
  height: number
}

export function Mesas(){
  const { params } = useRoute() as any
  // const navigation = useNavigation<StackNavigationProp<any, any>>();
  const theme = useTheme()
  const app = useApp()

  const [mesas, setMesas] = useState<IMesa[]>([])
  const [mesaSelecionada, setMesaSelecionada] = useState<IMesa>({} as IMesa)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = params?.tela === 'Pedidos' ? 'Lançamento de Pedidos' : 'Fechamento de Conta'  

  const [tamanho, setTamanho] = useState<ITamanhoMesa>(
    calculaTamanhoMesa(parseInt(app.config.qtd_mesas))
  )
   
  function calculaTamanhoMesa(qtd_mesas: number): ITamanhoMesa {
    let width, height

    if (qtd_mesas <= 15) {
      width = 100
      height = 100
    } else 
    if (qtd_mesas <= 20) {
      width = 80
      height = 100
    } else {
      width = 80
      height = 85
    }

    return { width, height }
  }

  function handlePedido(mesa: IMesa) {
    if (mesa.numMesa > 0) {
      setMesaSelecionada(mesa)
      setModalOpen(true)
    }
  }

  async function InicializaGrid() {       
    const grid: IMesa[] = [] 
    setLoading(true)

    try { 
      // let qtd_mesas = parseInt(app.config.qtd_mesas)
      const cfg = await app.getConfig()      
      let qtd_mesas = parseInt(cfg.qtd_mesas)
     
      for(var i = 0; i < qtd_mesas; i++) {
        grid.push({
          numMesa: i + 1,
          situacao: 'Livre',
          id_comanda: '0'
        })
      }

      // buscar da API
      const response = await api.get<IComanda[]>(`comandas?quemFechou=`)

      response.data.forEach((conta: IComanda) => {
        const numMesa = conta.numMesa ? parseInt(conta.numMesa) : "0"
        const idx = grid.findIndex(mesa => mesa.numMesa === numMesa)
        if (idx >= 0) {
          grid[idx].situacao = 'Ocupada'
          grid[idx].fechar = conta.fechar
          grid[idx].id_comanda = conta.id
          grid[idx].temNovoConsumo = conta.temNovoConsumo
        }
      })

    } catch(error) {
      console.log(error)
      
    } finally {
      setTamanho(calculaTamanhoMesa(grid.length))
      setMesas(grid)
      setLoading(false)
    }
  }

  function atualizaGrid() {
    async function inic() {
      if (modalOpen) {
        setModalOpen(false)
      }
      await InicializaGrid()
    }
    inic()
  }

  // useEffect(() => {
  //   async function inic() {      
  //     await InicializaGrid()
  //   }

  //   // atualiza o mapa a cada 5 seg
  //   const timer = setTimeout(() => {
  //     if (!loading && !modalOpen) {
  //       inic()
  //     }
  //   }, 5000)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  useFocusEffect(useCallback(() => {   
    async function inic() {      
      await InicializaGrid()
    }

    inic()
  }, []))

  return (
    <>
      <Header title={ title } />

      <Container
        colors={[theme.colors.back_light, theme.colors.back_darker]}
        end={{ x: 0.8, y: 0.8 }}        
      >
        {
          loading && <Loading />
        }

        {
          mesas.map((item: IMesa) => (
            <Mesa 
              numMesa={ item.numMesa } 
              ocupado={ item.situacao === 'Ocupada' }
              fechar={ item.fechar || item.temNovoConsumo }
              key={ item.numMesa }
              width={ tamanho.width }
              height={ tamanho.height }
              onPress={() => handlePedido(item)}
            />
          ))               
        } 
      </Container>
        
      <Modal 
        visible={ modalOpen }
        animationType="slide"
        transparent={false}	
      >
      {
        params?.tela === 'Fechar' 
        ?
          <Fechar 
            mesa={ mesaSelecionada } 
            handleBack={() => setModalOpen(false)} 
            handleConfirm={() => atualizaGrid()}
          />
        :
          <Pedido 
            mesa={ mesaSelecionada } 
            handleBack={() => setModalOpen(false)} 
            handleConfirm={() => atualizaGrid()}
          />
      }
      </Modal>    
    </>
  )
}
