import styled, { css } from "styled-components/native";
import { Dimensions } from 'react-native'
import theme from "../../styles/theme";

const altura = Math.floor(Dimensions.get('window').height / 2) - 200;
const largura = Math.floor(Dimensions.get('window').width / 2) - 100;

interface Props {
  bgColor: string
}

export const Container = styled.View<Props>`
  /* flex: 1; */
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;  
  top: 0;
  left: 0;

  ${props => props.bgColor === "transparent" 
    ? css`background-color: transparent;`
    : css`background-color: ${props.bgColor};`
  }
`;

export const LottieContainer = styled.View`
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;  
  top: ${ altura }px;
  left: ${ largura }px;
  background-color: rgba(0, 0, 0, 0.3);
`;