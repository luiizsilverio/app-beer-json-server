import styled, { css } from 'styled-components/native'
import { Platform } from 'react-native';

type Props = {
  modal: boolean
}

export const Container = styled.View<Props>`
  /* width: 100%; */
  height: 90px;
  background-color: ${props => props.theme.colors.back_darker};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  
  position: relative;
  ${props => props.modal 
    ? css`
      height: 60px;
    ` 
    : css`
      padding-top: ${() => Platform.OS === 'android' ? '30px' : '35px'};
    `}
  /* padding-top: ${() => Platform.OS === 'android' ? '30px' : '35px'}; */
`;

export const TitleContainer = styled.View`
  /* flex: 1; */
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

type TitleProps = {
  fontFamily: string
}

export const Title = styled.Text<TitleProps>`
  color: ${props => props.theme.colors.text_white};
  /* font-family: ${props =>props => props.theme.fonts.medium};   */
  font-family: ${props =>props => props.fontFamily};  
  font-size: 24px;    
`;

export const Imagem = styled.Image`
  width: 32px;
  height: 32px;  
`;

export const NewButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`  
  background-color: dodgerblue;
  font-size: 32px;  
  width: 90px;
  border-radius: 8px;
  margin-right: 16px;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  position: absolute;
  right: 0;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.text_white};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 18px;
  margin-left: 6px;
`;