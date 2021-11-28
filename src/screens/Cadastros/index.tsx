import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from 'styled-components'
import { Modal } from 'react-native'

import { Header } from '../../components/Header'
import { MyButton } from '../../components/MyButton'
import { Configuracoes } from '../Configuracoes'
import { Produtos } from '../Produtos'
import { Categorias } from '../Categorias'
import { PedeSenha } from '../PedeSenha'
import { Container } from './styles'
import { useApp } from '../../contexts'

enum Tela {
  Cadastros,
  Categorias,
  Produtos,
  Configuracoes
}

export function Cadastros(){
  const [modalOpen, setModalOpen] = useState(Tela.Cadastros)
  const navigation = useNavigation<StackNavigationProp<any, any>>();
  const theme = useTheme()
  const user = useApp()  

  let admin = user.isAdmin()

  function handleCategorias() {    
    // navigation.navigate('StackRoutes', { screen: 'Categorias' });
    setModalOpen(Tela.Categorias) 
  }

  function handleProdutos() {
    // navigation.navigate('StackRoutes', { screen: 'Produtos' });
    setModalOpen(Tela.Produtos) 
  }
  
  function handleConfig() {
    // navigation.navigate('StackRoutes', { screen: 'Configuracoes' });  
    setModalOpen(Tela.Configuracoes) 
  }
  
  function handleLogin() {    
    // console.log('handleLogin')
    admin = user.isAdmin()
  }

  return (
    <>
      <Header title="Cadastros" />

      <Container
        colors={[theme.colors.back_light, theme.colors.back_darker]}
        end={{ x: 0.8, y: 0.8 }}
      >
        <MyButton title="Categorias" 
          onPress={handleCategorias} 
          fontSize={20} 
          height={54}
        />
        <MyButton 
          title="Produtos" 
          onPress={handleProdutos} 
          fontSize={20} 
          height={54}
        />
        <MyButton 
          title="Configurações" 
          onPress={handleConfig} 
          fontSize={20} 
          height={54}
        />
      </Container>

      <Modal 
        visible={ modalOpen !== Tela.Cadastros && !admin }
        animationType="slide"
        transparent={false}	
      >
        <PedeSenha
          handleLogin={handleLogin}
          handleBack={() => setModalOpen(Tela.Cadastros)} 
        />
      </Modal>   

      <Modal 
        visible={ modalOpen === Tela.Categorias && admin }
        animationType="slide"
        transparent={false}	
      >
        <Categorias handleBack={() => setModalOpen(Tela.Cadastros)} />
      </Modal>   
      
      <Modal 
        visible={ modalOpen === Tela.Produtos && admin }
        animationType="slide"
        transparent={false}	
      >
        <Produtos handleBack={() => setModalOpen(Tela.Cadastros)} />
      </Modal>   

      <Modal 
        visible={ modalOpen === Tela.Configuracoes && admin }
        animationType="slide"
        transparent={false}	
      >
        <Configuracoes handleBack={() => setModalOpen(Tela.Cadastros)} />
      </Modal>   

    </>
  )
}
