import React from 'react'
import LottieView from 'lottie-react-native'
import { View } from 'react-native'

import loading from '../../assets/loading-skull.json'
import { Container, LottieContainer } from './styles'

interface Props {
  bgColor?: string
}

export function Loading({ bgColor = "transparent" }: Props){
  return (
    <Container bgColor={ bgColor }>
      <LottieContainer>
        <LottieView 
          source={loading}
          autoPlay
          style={{ width: 350, height: 350 }}        
          resizeMode="contain"        
          loop        
        />
      </LottieContainer>
    </Container>
  )
}
