import React, { useState } from 'react'
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native'

import {
  ButtonContainer,
  ImageContainer,
  TextButton  
} from './styles'

type Props  = TouchableOpacityProps & {	
  title: string
  fontSize?: number
  height?: number
}

export function MyButton({ title, fontSize = 18, height = 50, ...rest }: Props) {
  const [pressed, setPressed] = useState(false)
  function imagem() {
    switch (title) {
      case 'Produtos': 
        return <Ionicons name="beer-outline" size={32} />
      case 'Categorias':
        return <MaterialCommunityIcons name="food-fork-drink" size={32} />
      case 'Confirma':
        return <AntDesign name="checkcircleo" size={32} />
      case 'Configurações':
        return <Feather name="tool" size={32} />
      default:
        return null;
    }
  }

  function handlePress(press: boolean) {
    try {
      setPressed(press)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <ButtonContainer 
      activeOpacity={0.7} 
      height={ height } 
      onPressIn={() => handlePress(true)}
      onPressOut={() => handlePress(false)}      
      style={ pressed && {transform: [{ scale: 0.98 }]} }
      {...rest}
    >
    
        <ImageContainer>
          {
            imagem()
          }        
        </ImageContainer>

      <TextButton fontSize={ fontSize }>
        { title }
      </TextButton>

    </ButtonContainer>
  )
}