import React, { ReactNode, useState } from 'react'
import { View, Platform, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { styles } from './styles'

type ButtonProps = TouchableOpacityProps & {
  color?: string
  onClick?: () => void
  children: ReactNode
}

export function RoundButton({ 
  color = 'dodgerblue',   
  children, 
  ...rest 
}: ButtonProps) {
  const [press, setPress] = useState(false)

  return (
    <View style={[
      styles.buttonContainer, 
      { backgroundColor: color },
      Platform.OS === 'ios' ? styles.sombra_IOs : styles.sombra_Android,
      press && { transform: [
        { scale: 0.96 }, 
        // { translateX: -2 },
      ] }
    ]}>    
      <TouchableOpacity 
        onPressIn={() => setPress(true)} 
        onPressOut={() => setPress(false)}
        activeOpacity={0.7}
        // delayPressIn={100}
        // delayPressOut={100}
        { ...rest }
      >
        { children }
      </TouchableOpacity>
    </View>
  )
}
