import React, { useState } from 'react'
import { useTheme } from 'styled-components'
import Checkbox from 'expo-checkbox';

import { Container, Title, Label, CardActions, ButtonAction, Icon, TextContainer } from './styles'
import { IConsumo } from '../../dtos'

interface CategoryProps {
  data: IConsumo
  handleDelete: (data: IConsumo) => void
  handleEdit: (data: IConsumo) => void 
  handleFechou: (consumo: IConsumo) => void
}

export function FecharCard({ 
  data, 
  handleDelete, 
  handleEdit,
  handleFechou
}: CategoryProps){
  const [press, setPress] = useState([false, false, false])
  const [fechou, setFechou] = useState(data.fechou)
  const theme = useTheme()

  function ticou() {
    setFechou(!fechou)
    if (handleFechou)
      handleFechou(data)
    else
      setFechou(!fechou)
  }

  return (
    <Container>
      <CardActions>
        
        <ButtonAction 
          onPress={() => handleEdit(data)}
          onPressIn={() => setPress([true, false, false])}
          onPressOut={() => setPress([false, false, false])}
          style={ press[0] && { transform: [{ scale: 1.1 }] }}  
          activeOpacity={0.7}
          width={42}
        >
          {/* <Icon name="check-circle" color="#7fff00" /> */}
          <Checkbox 
            style={{ width: 24, height: 24 }}
            // disabled 
            value={ fechou } 
            onValueChange={ ticou } 
            color={fechou ? theme.colors.green : theme.colors.text_light}
          />
        </ButtonAction>
    
        <ButtonAction 
          onPress={() => handleEdit(data)}
          onPressIn={() => setPress([false, true, false])}
          onPressOut={() => setPress([false, false, false])}
          style={ press[1] && { transform: [{ scale: 1.1 }] }}  
          activeOpacity={0.9}
          width={40}
        >
          <Icon name="edit" color={theme.colors.empty_table} />
        </ButtonAction>

        <ButtonAction 
          onPress={() => handleDelete(data)}
          onPressIn={() => setPress([false, false, true])}
          onPressOut={() => setPress([false, false, false])}
          style={press[2] && { transform: [{ scale: 1.2 }] }}
          width={42}
          activeOpacity={0.7}
        >
          <Icon name="x" color={theme.colors.error} />
        </ButtonAction>
      </CardActions>
      
      <TextContainer>
        <Title fechou={ fechou }>
          { data.name }
        </Title>        
        <Label fechou={ fechou }>
          { `${data.qtd} x ${data.vl_unit} = R$ ${data.vl_total}` }
        </Label> 
      </TextContainer>
    </Container>
  )
}