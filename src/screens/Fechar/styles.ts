import styled, { css } from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList } from 'react-native'
import theme from '../../styles/theme'

// export const Container = styled(LinearGradient).attrs({
//   colors: [theme.colors.back_light, theme.colors.back_darker],
//   end: { x: 0.8, y: 0.8 }
// })`

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  position: relative;
`;

export const Lista = styled(FlatList)
.attrs({
  contentContainerStyle: { padding: 16 },
  showsVerticalScrollIndicator: false,
  pagingEnabled: true
})`
  padding-bottom: 32px;  
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text_white};
  font-family: ${props => props.theme.fonts.light};
  font-size: 24px;
  margin-right: 16px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 24px;
`;

export const Footer = styled.View`  
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.back_darker};
  padding: 20px;  
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  bottom: 16px;
  background-color: transparent;
  width: 90px;
  height: 350px;
`;