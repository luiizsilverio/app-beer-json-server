import React, { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { Alert, Modal, Platform, ToastAndroid } from 'react-native'
import uuid from 'react-native-uuid'

import { Container, Lista, Title, Footer, Label, ButtonContainer } from './styles'
import { IComanda, IConsumo, IMesa } from '../../dtos'
import theme from '../../styles/theme'
import api from '../../services/api'

import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { RoundButton } from '../../components/RoundButton'
import { FecharCard } from '../../components/FecharCard'
import { ConsumoDetails } from '../ConsumoDetails'

enum Tela {
  Comanda,
  Inclusao,
  Alteracao
}

type Status = {
  gravando: boolean
  caveira: boolean
}

interface Props {
  mesa: IMesa
  handleBack: () => void
  handleConfirm?: () => void
}

export function Fechar({ mesa, handleBack, handleConfirm = () => {} }: Props){
  // const route = useRoute()
  const [loading, setLoading] = useState<Status>({gravando: false, caveira: false})
  const [comanda, setComanda] = useState<IComanda>({} as IComanda)
  const [consumos, setConsumos] = useState<IConsumo[]>([])
  const [consumo, setConsumo] = useState<IConsumo>({} as IConsumo)
  const [modalOpen, setModalOpen] = useState<Tela>(Tela.Comanda)  
  const [id_comanda, setId_comanda] = useState("")
  const [newConta, setNewConta] = useState(false)

  const numMesa = mesa ? mesa.numMesa.toString().padStart(3, '0') : ""

  const total = useMemo(() => consumos.reduce((acc, item) => {
      return acc + parseFloat(item.vl_total)
    }, 0), [consumos])
  
  async function abreComanda() {    
    if (!mesa) {
      return
    }

    let id = id_comanda
    if (id === "" || id === "0") {
      id = mesa.id_comanda
    }    
    if (id === "" || id === "0") {
      setNewConta(true)
      return
    }    

    try {
      setLoading({ gravando: true, caveira: true })      
      const response = await api.get<IComanda>(`comandas/${ id }`)
      
      if (id !== id_comanda) {
        setId_comanda(id)
      }

      setComanda(response.data)    

      const despesas = await api.get<IConsumo[]>(`consumo?id_comanda=${ id }`, {
        params: {
          _sort: 'name',
          _order: 'asc'
        }
      })

      setConsumos(despesas.data)
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading({ gravando: false, caveira: false })      
    }    
  }

  function pediuFecharConta() {
    async function fecharConta(fechar: boolean) {
      if (comanda.fechar === fechar) {
        return
      }

      try {        
        setLoading({ gravando: true, caveira: false })          
        
        const newComanda = {...comanda, fechar: fechar}
        
        await api.put<IComanda>(`comandas/${mesa.id_comanda}`, { ...newComanda })

        //setComanda(newComanda) //não precisa, pois vai fechar a janela
        setLoading({ gravando: false, caveira: false })      
        handleConfirm()
      }
      catch (error) {
        console.log(error)
        setLoading({ gravando: false, caveira: false })    
        handleConfirm()
      }
    }
    
    Alert.alert("Fechar Conta", 
      'Cliente pediu para fechar a conta?',
      [
        { 
          text: "SIM", 
          onPress: () => {fecharConta(true)}
        },
        {
          text: "NÃO",
          style: 'cancel',  // mostra em vermelho, somente iOS
          onPress: () => {fecharConta(false)}
        },
      ]
    )
  }

  function handleFecharConta() {
    async function fecharConta(id: string) {
      try {
        setLoading({ gravando: true, caveira: true })    

        const hoje = new Date()
        const newComanda: IComanda = {
          ...comanda, 
          temNovoConsumo: false,
          dtFecha: hoje.toISOString().substring(0,16),
          quemFechou: 'operador'
        }
        
        await api.put<IComanda>(`comandas/${ id }`, { ...newComanda })

        setLoading({ gravando: false, caveira: false })        
        handleConfirm()
      }
      catch (err) {
        console.log(err)
        setLoading({ gravando: false, caveira: false })    
        handleConfirm()
      }
    }

    let id = id_comanda    
    if (id === "" || id === "0") {
      id = mesa.id_comanda      
    }    
    if (id === "" || id === "0") {
      return
    }

    
    Alert.alert("Fechar Conta", 
      'Confirma fechamento da conta?',
      [
        { 
          text: "Confirma", 
          onPress: () => {fecharConta(id)}
        },
        {
          text: "Cancela",
          style: 'cancel',  // mostra em vermelho, somente iOS
        },
      ]
    )
  }

  function handleExclui(consumo: IConsumo) {
    if (!consumo.id) {
      return
    }
    
    Alert.alert("Exclusão", 
      'Confirma excluir esse consumo?',
      [
        { 
          text: "SIM", 
          onPress: () => excluiConsumo(consumo.id),
          style: 'cancel',  // mostra em vermelho, somente iOS
        },
        {
          text: "NÃO",
          onPress: () => {}
        },
      ]
    )
  }

  async function excluiConsumo(id: string) {
    try {
      setLoading({ gravando: true, caveira: true })    
      
      await api.delete(`consumo/${ id }`)

      // abreComanda()
      const lista = [...consumos].filter(item => item.id !== id)
      setConsumos(lista)
      setNewConta(true)

      const temNovoConsumo = consumos.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo 
        })
      }      
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading({ gravando: false, caveira: false })    
    } 
  }

  function alteraConsumo(consumo: IConsumo) {    
    setConsumo(consumo)
    setModalOpen(Tela.Alteracao)
  }

  function incluiConsumo() {
    let id = id_comanda    
    if (id === "" || id === "0") {
      id = mesa.id_comanda      
    }    
    if (id === "" || id === "0") {
      id = uuid.v4() as string
      setNewConta(true);
    }
    if (id_comanda !== id) {
      setId_comanda(id)
    }
    setConsumo({} as IConsumo)
    setModalOpen(Tela.Inclusao)
  }

  async function fechaConsumo(desp: IConsumo) {
    setLoading({ gravando: true, caveira: false })    

    const newConsumo: IConsumo = { 
      ...desp,
      fechou: !desp.fechou      
    }

    try {
      await api.put<IConsumo>(`consumo/${ desp.id }`, { ...newConsumo })
    
      const idx = consumos.findIndex(item => item.id === desp.id)
      consumos[idx].fechou = newConsumo.fechou
      // setConsumos([ ...lista ])      

      const temNovoConsumo = consumos.some(item => !item.fechou)
      if (temNovoConsumo !== comanda.temNovoConsumo) {
        await api.put<IComanda>(`comandas/${ id_comanda }`, {
          ...comanda,
          temNovoConsumo 
        })

        setNewConta(true)
      }
    }
    catch (error) {
      console.log(error)
    }
    finally {
      setLoading({ gravando: false, caveira: false })     
    }
  }

  function onBack(refresh: boolean) {
    async function inic() {
      await abreComanda()
    }
    setModalOpen(Tela.Comanda)
    if (refresh) {      
      inic()
    }
  }

  // useEffect(() => {
  //   async function inic() {
  //     await abreComanda()
  //   }
  //   inic()
  // }, [])

  useFocusEffect(useCallback(() => {   
    async function inic() {
      await abreComanda()
    }
        
    // se tiver algum consumo que não foi ticado, avisa
    if (Platform.OS === 'android' && mesa?.fechar) {
      ToastAndroid.showWithGravity(
        'CLIENTE PEDIU PARA FECHAR A CONTA',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
        );      
      }
      
    inic()
  }, []))
  
  return (
    <>
      <Header 
        title={`MESA Nº ${ numMesa }`} 
        showBackButton 
        onBack={ loading.gravando ? () => {} : handleConfirm }
        // onBack={ loading.gravando ? () => {} : (newConta ? handleConfirm : handleBack) }
        showNewButton={false}
        modal={true}
      />

      <Container>
        {
          loading.caveira && <Loading />
        }      
      
        <Lista 
          data={ consumos }
          keyExtractor={(consumo: any) => consumo.id}
          renderItem={({ item }: any) => {
            return (
              <FecharCard 
                data={ item } 
                handleDelete={(item) => handleExclui(item)} 
                handleEdit={(item) => alteraConsumo(item)} 
                handleFechou={(item) => fechaConsumo(item)}
              />
            )}}   
        />     

        <Footer>
          <Label>TOTAL :</Label>
          <Title>R$ { total.toFixed(2) }</Title>
        </Footer>
        
        <ButtonContainer>
                   
          {
            ( !loading.gravando ) &&
              <RoundButton 
                color={theme.colors.text_table}
                onPress={incluiConsumo} 
              >
                <Ionicons 
                  name="add" 
                  size={54} 
                  color={theme.colors.text_light}                  
                />
              </RoundButton>
          }

          {
            ( !loading.gravando ) && ( !newConta ) && 
              <RoundButton 
                color={theme.colors.error}
                onPress={pediuFecharConta}
              >
                <Entypo 
                  name="flag" 
                  size={40} 
                  color={theme.colors.text_white}
                />
              </RoundButton>          
          }

          {
            ( !loading.gravando ) &&
              <RoundButton 
                color={theme.colors.green} 
                onPress={handleFecharConta}
              >
                <Ionicons 
                  name="checkmark" 
                  size={50} 
                  color={theme.colors.text_light}
                />
              </RoundButton>    
          }      
        </ButtonContainer>

      </Container>

      <Modal 
        visible={ modalOpen === Tela.Alteracao }
        animationType="slide"
        transparent={false}	
      >
        <ConsumoDetails 
          title={`CONSUMO MESA Nº ${ numMesa }`}
          data={ consumo }
          id_comanda={ id_comanda }
          numMesa={ numMesa }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)} 
        />
      </Modal>

      <Modal 
        visible={ modalOpen === Tela.Inclusao }
        animationType="slide"
        transparent={false}	
      >
        <ConsumoDetails 
          title={`CONSUMO MESA Nº ${ numMesa }`}
          data={ {} as IConsumo }
          id_comanda={ id_comanda }
          numMesa={ numMesa }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)} 
        />
      </Modal>      
    </>
  )
}
