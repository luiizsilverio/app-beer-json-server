import React, { useEffect, useState } from 'react'
// import { useRoute, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import {
  Platform ,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native'

import api from '../../services/api'
import { Container, Form, ButtonContainer } from './styles'
import { IProduct } from '../../dtos'
import { useApp } from '../../contexts'

import { Header } from '../../components/Header'
import { InputForm } from '../../components/InputForm'
import { MyPicker } from '../../components/MyPicker'
import { MyButton } from '../../components/MyButton'
import { Loading } from '../../components/Loading'

const schema = Yup.object().shape({
  id: Yup.number()
		.required('Código obrigatório')
    .typeError('Número incorreto'),
  name: Yup.string()
		.min(3, 'Informe no mínimo 3 letras')
		.required('nome obrigatório')
    .uppercase(),
  id_categoria: Yup.number()
    .required('Informe a categoria')
    .positive('Informe a categoria'),
    preco: Yup.number()
    .typeError('Valor incorreto (use ponto no lugar de vírgula)')
    .required('Informe o Preço')
    .positive('Preço inválido')
})

interface Props {
  title: string
  data: IProduct
  handleBack?: () => void
  handleConfirm?: () => void
}

interface CategoryProps {
  id: string
  name: string
}

export function ProductDetails({
  title, 
  data, 
  handleBack = () => {},
  handleConfirm = () => {}
}: Props){
  const [loading, setLoading] = useState(false)
  const newProduct = (!data || data?.id === undefined);
  const app = useApp()

  // const route = useRoute()
	// const { title, data } = route.params as Props
  // const navigation = useNavigation()
  
  const formik = useFormik({
    initialValues: { 
      id: data.id, 
      name: data.name,
      preco: data.preco,
      id_categoria: data.id_categoria
    },
    onSubmit: values => {
      Alert.alert("Produto", 
        'Confirma gravar os dados do produto?',
        [
          { 
            text: "Confirma", 
            onPress: () => {saveProduct()}
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
  
  async function saveProduct() {    
    // alert(JSON.stringify(formik.values, null, 2));
    setLoading(true)

    try {
      if (newProduct) {
        await api.post<IProduct>('/products', {
          ...formik.values
        })
      } else {
        await api.put<IProduct>(`/products/${ formik.values.id }`, {
          ...formik.values
        })
      }

      app.inicProducts() 
      setLoading(false)
      // navigation.goBack()
      handleConfirm()
    }
    catch(error) {
      console.log(error)
      setLoading(false)
      Alert.alert('Erro ao gravar o cadastro')  
      handleConfirm()
    }
  }

  async function loadCategories() {
    setLoading(true)
    app.loadCategories()
    setLoading(false)
  }

  useEffect(() => {
    if (app.categories.length === 0) {
      loadCategories()
    }
  }, [])

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
              editable={ newProduct }
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

            <MyPicker
              enabled={true}
              mode="dropdown"
              selectedValue={formik.values.id_categoria}
              onValueChange={formik.handleChange('id_categoria') as any}
              error={formik.errors.id_categoria}
              itens={app.categories}
            />             

            <InputForm 
              placeholder="Preço" 
              keyboardType="numeric"
              editable
              onChangeText={formik.handleChange('preco')}
              value={formik.values.preco}
              error={formik.errors.preco}
              touched={formik.touched.preco}
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