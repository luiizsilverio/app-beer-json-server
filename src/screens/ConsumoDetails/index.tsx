import React, { useEffect, useState } from 'react'
import NumericInput from 'react-native-numeric-input'
import uuid from 'react-native-uuid'

import {
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback, 
  Keyboard,
  Alert,
  View,
  ViewStyle
} from 'react-native'

import api from '../../services/api'
import { IConsumo, IComanda } from '../../dtos'
import { useApp } from '../../contexts'
import { Container, Form, ButtonContainer, Label } from './styles'

import { Header } from '../../components/Header'
import { InputForm } from '../../components/InputForm'
import { MyButton } from '../../components/MyButton'
import { Loading } from '../../components/Loading'
import { MyPicker } from '../../components/MyPicker'
import { useTheme } from 'styled-components'

interface Props {
  title: string
  data: IConsumo
  id_comanda: string
  numMesa: string  
  handleBack?: () => void
  handleConfirm?: () => void
}

export function ConsumoDetails({
  title, 
  data, 
  id_comanda,
  numMesa,
  handleBack = () => {}, 
  handleConfirm = () => {}
}: Props) {
  const [loading, setLoading] = useState(false)
  const [id_product, setId_product] = useState(data?.id_product || "")
  const [quant, setQuant] = useState(parseInt(data.qtd || "1"))
  const [total, setTotal] = useState(data.vl_total || "0.00")
  const [vlun, setVlun] = useState(data.vl_unit || "0.00")

  const novo = (!data || data?.id === undefined);
  const app = useApp()
  const theme = useTheme()
    
  async function handleSave() {
    if (id_product === "") {
      Alert.alert("Informe o produto")
      return
    }
    if (quant <= 0) {
      Alert.alert("Informe a quantidade")
      return
    }

    Alert.alert("Confirmação", 
      'Confirma os dados do consumo?',
      [
        { 
          text: "Confirma", 
          onPress: () => saveConsumo()
        },
        {
          text: "Cancela",
          style: 'cancel',  // mostra em vermelho, somente iOS
          onPress: () => {}
        },
      ]
    )
  }

  async function saveConsumo() {    
    
    // Se não existir a comanda, abre uma nova conta na mesa
    setLoading(true)
    let comanda = {} as IComanda
    let achou = false
    
    const response = await api.get<IComanda>(`comandas/${ id_comanda }`)

    comanda = response.data
    achou = comanda?.id === id_comanda

    // se não existe a comanda, precisa abrir nova conta
    try {
      if (!achou) {
        const hoje = new Date()
        const newComanda: IComanda = {
          id: id_comanda,
          dtAbertura: hoje.toISOString().substring(0,16),
          numMesa: numMesa,
          fechar: false,
          dtFecha: "",
          quemFechou: "",
          temNovoConsumo: true
        }  
      
        await api.post<IComanda>('comandas', { ...newComanda })
      }          
      else {
        await api.put<IComanda>(`comandas/${ id_comanda }`, { 
          ...comanda,
          temNovoConsumo: true
        })
      }
    }
    catch(error) {
      console.log(error)
      setLoading(false)
      Alert.alert('Erro ao gravar a comanda')
      handleConfirm()
    }     

    const name = app.products.find(item => item.id === id_product)?.name || ""   

    let id = data.id
    if (!id) {
      id = uuid.v4() as string
    }

    const newConsumo: IConsumo = {
      id,
      id_comanda,
      id_product,
      name,
      qtd: quant.toString(),
      vl_unit: vlun,
      vl_total: total,
      fechou: false
    }

    try {
      if (novo) {
        await api.post<IConsumo>('/consumo', { ...newConsumo })

      } else {
        await api.put<IConsumo>(`/consumo/${ id }`, { ...newConsumo })
      }

      setLoading(false)
      handleConfirm()
    }
    catch(error) {
      console.log(error)
      setLoading(false)
      Alert.alert('Erro ao gravar o consumo')
      handleConfirm()
    } 
  }

  useEffect(() => {
    async function init() {
      if (app.products.length === 0) {
        app.loadProducts()
      }

      const prod = app.products.find(item => item.id === id_product)

      if (prod) {
        if (quant !== parseInt(data.qtd)) {
          setQuant(parseInt(data.qtd))        
        } else {
          setVlun(parseFloat(prod.preco).toFixed(2))
          const tot = quant * parseFloat(vlun)
          setTotal(tot.toFixed(2))
        }
      }
    }
    
    init()
  }, [])

  useEffect(() => {
    const prod = app.products.find(item => item.id === id_product)
    if (prod) {      
      const vun = parseFloat(prod.preco);
      const tot = vun * quant;
      setVlun(vun.toFixed(2))
      setTotal(tot.toFixed(2))
    }
  }, [id_product]);

  useEffect(() => {
    const vun = parseFloat(vlun);
    const tot = vun * quant;
    setTotal(tot.toFixed(2))
  }, [quant]);


  return (
    <>   
      <Header 
        title={ title } 
        showBackButton 
        onBack={ loading ? () => {} : handleBack }
        modal={true} 
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <>
      {
          loading && <Loading />
      }

      <Container>      
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >

          <Form>                        
            <Label>Descrição do Produto</Label>
            <MyPicker
              itens={ app.products }
              enabled={true}
              mode="dropdown"              
              selectedValue={ id_product }
              onValueChange={(itemValue) => setId_product(itemValue.toString())}
            />   
          
            <View style={{marginRight: '30%'}}>
              <Label>Quantidade</Label>
              <NumericInput 
                type='plus-minus' 
                value={ quant }
                onChange={value => setQuant(value)}
                minValue={1}
                maxValue={100}
                rounded
                totalWidth={200}
                totalHeight={52}
                textColor={theme.colors.text_light}
                borderColor={theme.colors.back_darker}
                iconStyle={{ color: theme.colors.text_white } as ViewStyle}
                rightButtonBackgroundColor={theme.colors.back_darker}
                leftButtonBackgroundColor={theme.colors.back_darker}
                containerStyle={{marginBottom: 24}}
                // initValue={parseInt(formik.values['qtd'])}
              />

              <Label>Valor Unitário R$</Label>
              <InputForm 
                editable={false}
                value={ vlun }
              />
              
              <Label>Valor Total R$</Label>
              <InputForm 
                editable={false}
                value={ total } 
                style={{ fontSize: 24, height: 50, color: theme.colors.secondary }}
              />
            </View>
          </Form>

        </KeyboardAvoidingView>

        { 
          !loading && 
          <ButtonContainer>
            <MyButton 
              title="Confirma" 
              onPress={handleSave} 
              fontSize={20}
            />
          </ButtonContainer>
        }

      </Container>
      </>
      </TouchableWithoutFeedback>
    </>
  )
}