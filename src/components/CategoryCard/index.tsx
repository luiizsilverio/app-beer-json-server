import React from 'react'
import { useTheme } from 'styled-components'

import { Container, Title, CardActions, ButtonAction, Icon } from './styles'
import { ICategory } from '../../dtos'

interface CategoryProps {
  data: ICategory
  handleDelete: (data: ICategory) => void
  handleEdit: (data: ICategory) => void 
}

export function CategoryCard({ data, handleDelete, handleEdit }: CategoryProps){
  const theme = useTheme()

  return (
    <Container>
      <Title>{`${ data.id } - ${ data.name }`}</Title>
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