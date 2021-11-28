import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, Input, TextError } from './styles'
import { useTheme } from 'styled-components'

type Props = TextInputProps & {
  error?: string
  touched?: boolean
}

export function InputForm({error, touched = false, ...rest}: Props) {
  const theme = useTheme()
  const plhColor = rest.placeholderTextColor || theme.colors.text_gray;
    
  return (      
    <>
      <Container error={ error } touched={ touched } >
        <Input 
          {...rest}
          placeholderTextColor={plhColor}
          autoCapitalize="characters"    
        />
      </Container>
      <TextError>{ error }</TextError>
    </>
  )
}