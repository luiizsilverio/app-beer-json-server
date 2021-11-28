import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacityProps } from 'react-native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.back_light};
  border-radius: 5px;
  padding: 10px 12px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 68px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text_white};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 18px;
  width: 100%;
  height: 24px;
`;

type ButtonProps = {
  width: number
}

export const ButtonAction = styled.TouchableOpacity<ButtonProps>`
  width: ${ props => props.width }px;
`;

export const Icon = styled(Feather)`
  font-size: 30px;  
`;

export const CardActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 85px;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text_light};
  font-family: ${props => props.theme.fonts.light};
  font-size: 16px;
`;
