import React from 'react'
import { Platform } from 'react-native'
import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const { Navigator, Screen } = createBottomTabNavigator()

import { Cadastros } from '../screens/Cadastros'
import { Home } from '../screens/Home'
import { Mesas } from '../screens/Mesas'
import { PedeSenha } from '../screens/PedeSenha'
import { StackRoutes } from './stack.routes'
import { useApp } from '../contexts'

export function AppRoutes() {
  const theme = useTheme()
  const user = useApp()
  const admin = user.isAdmin()

  return (
    <Navigator   
      screenOptions={{        
        headerShown: false,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarInactiveBackgroundColor: theme.colors.back_darker,    
        tabBarActiveTintColor: theme.colors.secondary,    
        tabBarInactiveTintColor: theme.colors.text_light,
        tabBarLabelPosition: 'below-icon', //'beside-icon',
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: theme.fonts.light,
          paddingBottom: 5
        },
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: theme.colors.back_darker,
          height: 70,
        }
      }}     
    >
      
      <Screen
        name="Home"
        component={Home}
        options={{ 
          // tabBarItemStyle: { display: 'none' },
          tabBarIcon: (({ size, color }) => (
            <Feather  name="home" size={size} color={color} />
            ))            
        }}
      />       
      <Screen
        name="Pedidos"
        component={Mesas}
        initialParams={{ tela: "Pedidos"}}
        options={{          
          tabBarIcon: (({ size, color }) => (
            <MaterialCommunityIcons  name="table-edit" size={size} color={color} />
          ))
        }}
      />      
      
      <Screen
        name="Fechar"
        component={ admin ? Mesas : PedeSenha }
        initialParams={{ tela: "Fechar"}}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Ionicons name="md-calculator" size={size} color={color} />
            // <MaterialIcons name="table-view" size={size} color={color} />
            ))
          }}
      />
      
      <Screen
        name="Cadastros"
        component={Cadastros}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Feather name="tool" size={size} color={color} />
            // <Ionicons name="beer-outline" size={size} color={color} />
          ))          
        }}
      />                   

      <Screen
        name="StackRoutes"
        component={StackRoutes}
        options={{          
          tabBarItemStyle: { display: 'none', }
        }}
      />
    </Navigator>
  )
}