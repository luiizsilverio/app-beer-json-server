import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
const { Navigator, Screen } = createStackNavigator()

import { Categorias } from '../screens/Categorias';
import { Produtos } from '../screens/Produtos';
import { Configuracoes } from '../screens/Configuracoes';

export function StackRoutes() {
  
  return (
    <Navigator
      screenOptions={{        
        headerShown: false,        
      }}     
    >      

      <Screen
        name="Categorias"
        component={Categorias}        
        options={{ gestureEnabled: false }}
      />
      <Screen
        name="Produtos"
        component={Produtos}        
        options={{ gestureEnabled: false }}
      />
      <Screen 
        name="Configuracoes"
        component={Configuracoes}
        options={{ gestureEnabled: false }}
      />          
           
    </Navigator>
  )
}