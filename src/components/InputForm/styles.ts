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
  padding: 16px;
  height: 50px;
  margin-bottom: 4px;
`;

export const Input = styled.TextInput`
  font-family: ${props => props.theme.fonts.medium};
  font-size: 18px;
  /* width: 100%; */
  flex: 1;

  color: ${props => props.editable
    ? props.theme.colors.text_light
    : props.theme.colors.text_gray
  };

  /* ::placeholder {
    color: ${props => props.theme.colors.text_gray};
  } */
`;

export const TextError = styled.Text`
  color: red;
  text-align: center;
  position: relative;
  top: -4px;
`;
