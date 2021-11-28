import React, { useState } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native'

import api from '../../services/api'
import { useApp } from '../../contexts'
import { ICategory } from '../../dtos'
import { Container, Form, ButtonContainer } from './styles'

import { Header } from '../../components/Header'
import { InputForm } from '../../components/InputForm'
import { MyButton } from '../../components/MyButton'
import { Loading } from '../../components/Loading'

const schema = Yup.object().shape({
  id: Yup.number()
    .required('Código obrigatório')
    .typeError('Número incorreto'),
    
  name: Yup.string()
		.min(3, 'Informe no mínimo 3 letras')
		.required('nome obrigatório')
    .uppercase()
})

interface Props {
  title: string
  data: ICategory
  handleBack?: () => void
  handleConfirm?: () => void
}

export function CategoryDetails({
  title, 
  data, 
  handleBack = () => {}, 
  handleConfirm = () => {}
}: Props){
  const [loading, setLoading] = useState(false)
  const newCategory = (!data || data?.id === undefined);
  const app = useApp()

  // const route = useRoute()
	// const { title, data } = route.params as Props
  // const navigation = useNavigation()
    
  const formik = useFormik({
    initialValues: { id: data.id, name: data.name },
    onSubmit: values => {
      Alert.alert("Categoria", 
        'Confirma gravar os dados da categoria?',
        [
          { 
            text: "Confirma", 
            onPress: () => {saveCategory()}
          },
          {
            text: "Cancela",
            style: 'cancel',  // mostra em vermelho, somente iOS
            onPress: () => {}
          },
        ]
      )
    },
    validationSchema: schema,
    enableReinitialize: true
  });

  async function saveCategory() {    
    // alert(JSON.stringify(formik.values, null, 2));
    setLoading(true)

    try {
      if (newCategory) {
        await api.post<ICategory>('/categories', {
          ...formik.values
        })
      } else {
        await api.put<ICategory>(`/categories/${ formik.values.id }`, {
          ...formik.values
        })
      }

      setLoading(false)
      // navigation.goBack()
      app.inicCategories()
      handleConfirm()
    }
    catch(error) {
      console.log(error)
      setLoading(false)
      Alert.alert('Erro ao gravar o cadastro')
      handleConfirm()
    } 
  }

  return (
    <>   
      <Header 
        title={ title } 
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
            <InputForm 
              placeholder="Código" 
              keyboardType="numeric"
              editable={ newCategory }
              onChangeText={formik.handleChange('id')}    
              value={formik.values.id}   
              error={formik.errors.id}   
              touched={formik.touched.id}    
            />
            <InputForm 
              placeholder="Nome" 
              autoCapitalize="characters"
              autoCorrect={false}
              keyboardType="default"
              maxLength={50}
              editable
              onChangeText={formik.handleChange('name')}
              value={formik.values.name}
              error={formik.errors.name}
              touched={formik.touched.name}
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