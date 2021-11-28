import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

// import { useNavigation } from '@react-navigation/native'
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
// import { StackNavigationProp } from '@react-navigation/stack'

import { useApp } from '../../contexts'
import { Container, SenhaContainer, Title, InputContainer, Input } from './styles'
import { Header } from '../../components/Header'
import { MyButton } from '../../components/MyButton'
import { Alert } from 'react-native'

interface Props {
  handleLogin?: () => void
  handleBack?: () => void
}

export function PedeSenha({ handleLogin = () => {}, handleBack = () => {} }: Props){
  const [senha, setSenha] = useState('')
  const theme = useTheme()
  const auth = useApp()

  // const tabNavigation = useNavigation<BottomTabNavigationProp<any, any>>()
  // const navigation = useNavigation<StackNavigationProp<any, any>>()

  function onLogin() {    
    if (!auth.isAdmin(senha)) {    
      Alert.alert("Senha incorreta")
    } else {
      handleLogin()
    }
  }

  return (
    <>
      <Header title="Acesso Restrito" 
        showBackButton 
        onBack={handleBack} 
        modal
      />

      <Container>
        <SenhaContainer>
          <Feather 
            name="lock" 
            size={64} 
            color={theme.colors.secondary}
            style={{marginRight: 8}}
          />

          <Title>Senha do Admin</Title>
          
          <InputContainer>
            <Input 
              secureTextEntry
              maxLength={10}
              multiline={false}
              placeholder="Digite a senha" 
              placeholderTextColor={theme.colors.text_gray}
              value={senha}
              onChangeText={setSenha}
            />          
          </InputContainer>

          <MyButton title="Confirma" onPress={onLogin} />

        </SenhaContainer>
      </Container>
    </>
  )
}
