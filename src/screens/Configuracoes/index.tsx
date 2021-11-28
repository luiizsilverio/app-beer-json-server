import React, { useEffect, useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
} from 'react-native'

import { IConfig } from '../../dtos'
import { useApp } from '../../contexts'
import { ButtonContainer, Container, Form, Caption } from './styles'

import { Header } from '../../components/Header'
import { InputForm } from '../../components/InputForm'
import { MyButton } from '../../components/MyButton'
import { Loading } from '../../components/Loading'

const schema = Yup.object().shape({
  senha_adm: Yup.string()
    .uppercase(),
  qtd_mesas: Yup.number()
    .required('Número de mesas obrigatório')
    .typeError('Quantidade incorreta')
    .positive('Informe uma quantidade maior do que zero')
    .max(24, 'A capacidade máxima do App é de 24 mesas')
})

interface Props {
  handleBack?: () => void
}

export function Configuracoes({ handleBack = () => {} }: Props) {
  const [loading, setLoading] = useState(false)
  // const navigation = useNavigation()
  const app = useApp()

  const formik = useFormik({
    initialValues: { 
      qtd_mesas: app.config.qtd_mesas, 
      senha_adm: app.config.senha_adm 
    },
    onSubmit: values => {
      Alert.alert("Configurações do App", 
        'Confirma gravar as configurações?',
        [
          { 
            text: "Confirma", 
            style: 'cancel',  // mostra em vermelho, somente iOS
            onPress: () => {saveConfig()}
          },
          {
            text: "Cancela",
            onPress: () => {}
          },
        ]
      )
    },
    validationSchema: schema,
    enableReinitialize: true
  });

  async function saveConfig() {        
    const newConfig: IConfig = {
      id: "1",
      senha_adm: formik.values.senha_adm,
      qtd_mesas: formik.values.qtd_mesas.toString()
    }
    
    setLoading(true)

    await app.gravaConfig(newConfig)

    setLoading(false)  

    handleBack()
    // navigation.goBack()
  }

  useEffect(() => {
    async function inic() {
      const config = await app.getConfig()
    }
    inic()
  }, [])

  useFocusEffect(useCallback(() => {   
    async function inic() {
      const config = await app.getConfig()
    }
    inic()
  }, []))

  return (
    <>
      <Header 
        title="Configurações do App" 
        showBackButton 
        onBack={ loading ? () => {} : handleBack }
        modal={true}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <Container>      
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >

        {
          loading ? <Loading />
          :             
          <Form>
            <Caption>Número de Mesas</Caption>
            <InputForm 
              placeholder="Digite o nº de mesas" 
              keyboardType="numeric"
              onChangeText={formik.handleChange('qtd_mesas')}    
              value={formik.values.qtd_mesas}   
              error={formik.errors.qtd_mesas}   
              touched={formik.touched.qtd_mesas}    
            />
            <Caption>Senha do Administrador</Caption>
            <InputForm 
              placeholder="Digite a senha" 
              secureTextEntry
              maxLength={10}
              multiline={false}
              onChangeText={formik.handleChange('senha_adm')}    
              value={formik.values.senha_adm}   
              error={formik.errors.senha_adm}   
              touched={formik.touched.senha_adm} 
            />
          </Form>
        }

        </KeyboardAvoidingView>

        { 
          !loading && 
          <ButtonContainer>
            <MyButton 
              title="Confirma" 
              onPress={() => formik.handleSubmit()} 
              fontSize={20}
            />
          </ButtonContainer>
        }

      </Container>
      </TouchableWithoutFeedback>
    </>
  )
}
