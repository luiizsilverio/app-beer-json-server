import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
`;

type ButtonProps = {
  height: number
}

export const ButtonContainer = styled(TouchableOpacity)<ButtonProps>`
  height: ${props => props.height}px; //50px;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
  position: relative;
`;

export const ImageContainer = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  border-color: ${props => props.theme.colors.secondary_light};
  position: absolute;
`;

type TextProps = {
  fontSize: number
}

export const TextButton = styled.Text<TextProps>`
  flex: 1;
  text-align: center;
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${props => props.fontSize}px; //18px;
`;

