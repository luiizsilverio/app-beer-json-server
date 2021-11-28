import React from 'react'
import { StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons'
import { Header } from '../../components/Header';
import imgFundo from '../../assets/bg-main2.jpg';

import { Container, Fundo } from './styles'

export function Home(){
  const theme = useTheme()
  const tam50 = '50%'

  return (
    <>
      <Header title="B E E R 🍺 A P P" fontFamily={ theme.fonts.logo } />

      <Container
        colors={[theme.colors.back_light, theme.colors.back_darker]}
        end={{ x: 0.7, y: 0.9 }}>

        <Ionicons 
          name="beer-outline" 
          size={200} 
          color={theme.colors.secondary} 
        />
        
        {/* <Fundo
          source={{}}
          imageStyle={{ borderRadius: 105, borderWidth: 4, borderColor: theme.colors.back_light }}
          width={208}
          height={486}
        >
          <Fundo 
            source={imgFundo} 
            imageStyle={{ opacity:0.7, borderRadius: 100 }}
            width={200}
            height={480}
            blurRadius={4}               
          >
            <Fundo 
              source={imgFundo} 
              imageStyle={{borderRadius: 90}} 
              blurRadius={0}     
              width={180}
              height={458}          
            />
          </Fundo>
        </Fundo> */}
      </Container>
    </>
  )
}

const style = StyleSheet.create({
  fundo: {
    opacity: 0.7,
    borderRadius: 30
  }
})