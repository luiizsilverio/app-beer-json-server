import React from 'react'
import { Picker, PickerProps } from '@react-native-picker/picker'
import { StyleSheet } from 'react-native'

import { Container, TextError } from './styles'
import theme from '../../styles/theme'
import { onChange } from 'react-native-reanimated'

type Lista = {
  id: string
  name: string
}

type Props = PickerProps & {
  itens: Lista[]
  error?: string
  touched?: boolean
}

export function MyPicker({itens, error, touched = false, ...rest}: Props) {    
  return (      
    <>
      <Container error={ error } touched={ touched } >
        <Picker 
          // mode="dialog"
          numberOfLines={1}
          {...rest} 
          style={ styles.picker }
          dropdownIconColor={ theme.colors.text_light }
        >
          {
            itens.map((item) => (
              <Picker.Item 
                label={ item.name } 
                value={ item.id } 
                key={ item.id } 
                fontFamily={ theme.fonts.medium }
                style={ styles.item }
                />
            ))
          }
        </Picker>
      </Container>
      <TextError>{ error }</TextError>
    </>
  )
}

const styles = StyleSheet.create({
  picker: {
    color: theme.colors.text_light,
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.back_darker,
    fontSize: 18,
    width: '100%',
  },
  item: {
    color: theme.colors.text_light,
    fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.back_darker,
    fontSize: 18,
  }
})
