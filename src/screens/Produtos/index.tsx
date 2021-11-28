import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
// import { useNavigation } from '@react-navigation/native'
// import { StackNavigationProp } from '@react-navigation/stack'
import { Alert, Modal } from 'react-native'

import api from '../../services/api'
import { Container, Lista } from './styles'
import { IProduct } from '../../dtos'

import { Loading } from '../../components/Loading'
import { Header } from '../../components/Header'
import { ProductCard } from '../../components/ProductCard'
import { ProductDetails } from '../ProductDetails'

enum Tela {
  Produtos,
  Inclusao,
  Alteracao
}

interface Props {
  handleBack?: () => void
}

export function Produtos({handleBack = () => {}}: Props) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState<Tela>(Tela.Produtos)  
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  // const navigation = useNavigation<StackNavigationProp<any, any>>();

  function loadProducts() {
    setLoading(true)
    api.get<IProduct[]>('products', {
      params: {
        _sort: 'name',
        _order: 'asc'
      }
    })
    .then(response => {
      setProducts(response.data)

    }).catch(error => {
      console.log(error)

    }).finally(() => {
      setLoading(false)
    })
  }

  useFocusEffect(useCallback(() => {
    loadProducts() //carrega os dados do BD ou API
  }, []))

  function handleDelete(data: IProduct) {
    Alert.alert("Exclusão do Produto", 
      `Confirma Excluir o produto \n${data.name}?`,
      [
        { 
          text: "Confirma", 
          style: 'cancel',  // mostra em vermelho, somente iOS
          onPress: () => {deleteProduct(data.id)}
        },
        {
          text: "Cancela",
          onPress: () => {}
        },
      ]
    )
  }

  async function handleEdit(product: IProduct) {
    setProduct(product)
    setModalOpen(Tela.Alteracao)
/*
    navigation.navigate('StackRoutes', { 
      screen: 'ProductDetails', 
      params: {
        title: 'Alterar Produto',
        data: product 
      }
    });
*/    
  }

  function handleInsert() {    
    setProduct({} as IProduct)
    setModalOpen(Tela.Inclusao)
/*
    navigation.navigate('StackRoutes', { 
      screen: 'ProductDetails' ,
      params: {
        title: 'Novo Produto',
        data: {} as IProduct
      }
    });
*/    
  }

  async function deleteProduct(id: string) {
    setLoading(true)

    try {
      await api.delete(`products/${ id }`)
      loadProducts() //carrega os dados do BD ou API
    }
    finally {
      setLoading(false)
    }        
  }

  function onBack(refresh: boolean) {
    setModalOpen(Tela.Produtos)
    if (refresh) {
      loadProducts()
    }
  }

  return (
    <>
      <Header 
        title="Produtos" 
        showNewButton 
        onNew={handleInsert} 
        showBackButton 
        onBack={ loading ? () => {} : handleBack }
        modal={true}
      />

      <Container>        
      {
        loading ? <Loading />
        :    
        <Lista 
          data={ products }
          keyExtractor={(product: any) => product.id}
          renderItem={({ item }: any) => {
            return (
              <ProductCard 
                data={ item } 
                handleDelete={handleDelete} 
                handleEdit={handleEdit} 
              />
            )}}   
        />
      }
      </Container>

      <Modal 
        visible={ modalOpen === Tela.Alteracao }
        animationType="slide"
        transparent={false}	
      >
        <ProductDetails 
          title="Alterar Produto"
          data={ product }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)} 
        />
      </Modal>

      <Modal 
        visible={ modalOpen === Tela.Inclusao }
        animationType="slide"
        transparent={false}	
      >
        <ProductDetails 
          title="Novo Produto"
          data={ {} as IProduct }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)} 
        />
      </Modal>
    </>
  )
}