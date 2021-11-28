import React, { useState } from 'react'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Button, Container, Title } from './styles'

interface Props {
  numMesa: number
  ocupado: boolean
  fechar?: boolean
  width?: number
  height?: number
  onPress?: () => void
}

export function Mesa({ 
  numMesa, 
  ocupado, 
  fechar = false, 
  width = 100, 
  height = 100, 
  onPress = () => {} 
}: Props){
  const [pressed, setPressed] = useState(false)
  const theme = useTheme()   
  const mesa = numMesa.toString().padStart(2, '0');
  
  function handlePress(press: boolean) {
    try {
      setPressed(press)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Container 
      ocupado={ ocupado } 
      fechar={ fechar } 
      width={ width } 
      height={ height }
      style={ pressed && { transform: [{ scale: 0.98 }] }}
    >
    <Button 
      onPress={ onPress }
      onPressIn={() => handlePress(true)}
      onPressOut={() => handlePress(false)}
      activeOpacity={0.7}
    >
      {
        fechar ?
          <Entypo
            name="flag"
            size={32} 
            color={ theme.colors.text_dark }          
          />
        :
        <Ionicons 
          name={ ocupado ? "people" : "people-outline" }
          size={32} 
          color={ theme.colors.text_dark }          
        />
      }
      <Title fechar={ fechar }>{ mesa }</Title>
    </Button>
    </Container>
  )
}