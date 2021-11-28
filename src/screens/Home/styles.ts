import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Platform } from 'react-native';

// export const Container = styled.View`
export const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  align-items: center;
  justify-content: center;
  padding: 22px 20px;  
`;

export const Fundo = styled.ImageBackground`
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  /* padding: 32px;   */
`;
