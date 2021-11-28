import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
// import { useNavigation } from '@react-navigation/native'
// import { StackNavigationProp } from '@react-navigation/stack'
import { Alert, Modal } from 'react-native'

import api from '../../services/api'
import { Container, Lista } from './styles'
import { ICategory } from '../../dtos'

import { Loading } from '../../components/Loading'
import { Header } from '../../components/Header'
import { CategoryCard } from '../../components/CategoryCard'
import { CategoryDetails } from '../CategoryDetails'

enum Tela {
  Categorias,
  Inclusao,
  Alteracao
}

interface Props {
  handleBack?: () => void
}

export function Categorias({handleBack = () => {}}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState<Tela>(Tela.Categorias)  
  const [category, setCategory] = useState<ICategory>({} as ICategory)
  // const navigation = useNavigation<StackNavigationProp<any, any>>();

  function loadCategories() {
    setLoading(true)
    api.get<ICategory[]>('categories', {
      params: {
        _sort: 'id',
        _order: 'asc'
      }
    })
    .then(response => {
      setCategories(response.data)

    }).catch(error => {
      console.log(error)

    }).finally(() => {
      setLoading(false)
    })
  }

  function handleDelete(data: ICategory) {
    Alert.alert("Exclusão da Categoria", 
      `Confirma Excluir a categoria \n${data.name}?`,
      [
        { 
          text: "Confirma", 
          style: 'cancel',  // mostra em vermelho, somente iOS
          onPress: () => {deleteCategory(data.id)}
        },
        {
          text: "Cancela",
          onPress: () => {}
        },
      ]
    )
  }
 
  async function deleteCategory(id: string) {
    setLoading(true)

    try {
      await api.delete(`categories/${ id }`)
      loadCategories() //carrega os dados do BD ou API
    }
    finally {
      setLoading(false)
    }        
  }

  async function handleEdit(category: ICategory) {
    setCategory(category)
    setModalOpen(Tela.Alteracao)
/*
    navigation.navigate('StackRoutes', { 
      screen: 'CategoryDetails', 
      params: {
        title: 'Alterar Categoria',
        data: category 
      }
    });
*/    
  }

  function handleInsert() {    
    setCategory({} as ICategory)
    setModalOpen(Tela.Inclusao)
  /*
    navigation.navigate('StackRoutes', { 
      screen: 'CategoryDetails' ,
      params: {
        title: 'Nova Categoria',
        data: {} as ICategory
      }
    });
  */
  }
  
  function onBack(refresh: boolean) {
    setModalOpen(Tela.Categorias)
    if (refresh) {
      loadCategories()
    }
  }

  useFocusEffect(useCallback(() => {
    loadCategories() //carrega os dados do BD ou API
  }, []))


  return (
    <>
      <Header 
        title="Categorias" 
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
          data={ categories }
          keyExtractor={(category: any) => category.id}
          renderItem={({ item }: any) => {
            return (
              <CategoryCard 
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
        <CategoryDetails 
          title="Alterar Categoria"
          data={ category }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)}
        />
      </Modal>

      <Modal 
        visible={ modalOpen === Tela.Inclusao }
        animationType="slide"
        transparent={false}	
      >
        <CategoryDetails 
          title="Nova Categoria"
          data={ {} as ICategory }
          handleBack={() => onBack(false)} 
          handleConfirm={() => onBack(true)}
        />
      </Modal>
    </>
  )
}