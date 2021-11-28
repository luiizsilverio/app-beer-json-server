import React from 'react'
import { useTheme } from 'styled-components'

import { Container, Title, CardActions, ButtonAction, Icon, TextContainer, Label } from './styles'
import { IProduct } from '../../dtos'

interface ProductProps {
  data: IProduct
  handleDelete: (data: IProduct) => void
  handleEdit: (data: IProduct) => void 
}

export function ProductCard({ data, handleDelete, handleEdit }: ProductProps){
  const theme = useTheme()

  return (
    <Container>
      <TextContainer>  
        <Title numberOfLines={1}>
          {`${ data.id } - ${ data.name}`}
        </Title>
        <Label>R$ { data.preco }</Label>
      </TextContainer>
      <CardActions>        
        <ButtonAction onPress={() => handleEdit(data)}>
          <Icon name="edit" color={theme.colors.text_light} />
        </ButtonAction>
        <ButtonAction onPress={() => handleDelete(data)}>
          <Icon name="x" color={theme.colors.error} />
        </ButtonAction>
      </CardActions>
    </Container>
  )
}