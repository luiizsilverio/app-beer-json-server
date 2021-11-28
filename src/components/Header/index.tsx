import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import { Container, Title, TitleContainer, NewButton, ButtonText } from './styles'
import { BackButton } from '../BackButton'

interface Props {
  title: string
  showLogo?: boolean
  showBackButton?: boolean
  showNewButton?: boolean
  onNew?: () => void
  onBack?: () => void
  fontFamily?: string,
  modal?: boolean
}

export function Header({ 
  title, 
  showLogo = false, 
  showBackButton = false,
  showNewButton = false,
  onNew = () => {},
  onBack,
  fontFamily,
  modal = false
}: Props){
  const theme = useTheme()

  fontFamily = !fontFamily ? theme.fonts.medium : fontFamily;
  
  return (    
    <Container modal={ modal }>
        {
          showBackButton && <BackButton onPress={onBack} />
        }
          
        <TitleContainer>
          <Title fontFamily={ fontFamily }>{ title }</Title>
          {
            showLogo &&
              <Ionicons 
                name="beer-outline" 
                size={32} 
                color={theme.colors.secondary}
                style={{marginLeft: 8}}
              />
          }
        </TitleContainer>

        {
          showNewButton && 
          <NewButton 
            onPress={onNew} 
          >
            <Feather name="plus" size={20} color="#fff" />
            <ButtonText >Novo</ButtonText>
          </NewButton> 
        }

    </Container>
  )
}