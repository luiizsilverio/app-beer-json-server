import React, { useState } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { Container } from './styles'

type Props = TouchableOpacityProps & {
  // color?: string
}

export function BackButton({ ...rest }: Props){
  const theme = useTheme()

  return (
    <Container 
      activeOpacity={0.7}
      {...rest}
    >
      <AntDesign 
        name="arrowleft"
        size={32}
        color={ theme.colors.text_light }
      />
    </Container>
  )
}