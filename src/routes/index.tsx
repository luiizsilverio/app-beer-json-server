import React from 'react'
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'

import { AppRoutes } from './app.routes'

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  )
}