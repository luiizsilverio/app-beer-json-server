import styled from 'styled-components/native'
import { ViewProps } from 'react-native'

type Props = ViewProps & {
  error?: string
  touched?: boolean
}

export const Container = styled.View<Props>`
  width: 100%;
  background-color: ${props => props.theme.colors.back_darker};
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;  
  position: relative;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 4px;
  height: 56px;
`;

export const TextError = styled.Text`
  color: red;
  text-align: center;
  position: relative;
  top: -4px;
`;
