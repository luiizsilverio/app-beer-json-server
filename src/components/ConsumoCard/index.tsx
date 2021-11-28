import React, { useState } from 'react'
import { useTheme } from 'styled-components'

import { Container, Title, Label, CardActions, ButtonAction, Icon, TextContainer } from './styles'
import { IConsumo } from '../../dtos'

interface CategoryProps {
  data: IConsumo
  handleDelete: (data: IConsumo) => void
  handleEdit: (data: IConsumo) => void 
}

export function ConsumoCard({ 
  data, 
  handleDelete, 
  handleEdit,
}: CategoryProps){
  const [press, setPress] = useState([false, false])
  const theme = useTheme()

  return (
    <Container>
      <CardActions>        

        <ButtonAction 
          onPress={() => handleEdit(data)}
          onPressIn={() => setPress([true, false])}
          onPressOut={() => setPress([false, false])}
          style={ press[0] && { transform: [{ scale: 1.1 }] }}  
          activeOpacity={0.9}
          width={40}
        >
          <Icon name="edit" color={theme.colors.empty_table} />
        </ButtonAction>

        <ButtonAction 
          onPress={() => handleDelete(data)}
          onPressIn={() => setPress([false, true])}
          onPressOut={() => setPress([false, false])}
          style={press[1] && { transform: [{ scale: 1.2 }] }}
          width={42}
          activeOpacity={0.7}
        >
          <Icon name="x" color={theme.colors.error} />
        </ButtonAction>
      </CardActions>
      
      <TextContainer>
        <Title>{ data.name }</Title>        
        <Label>{ `${data.qtd} x ${data.vl_unit} = R$ ${data.vl_total}` }</Label>                  
      </TextContainer>
    </Container>
  )
}