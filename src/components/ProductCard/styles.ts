import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  background-color: ${props => props.theme.colors.back_light};
  border-radius: 5px;
  padding: 10px 16px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text_white};
  font-family: ${props => props.theme.fonts.regular};
  font-size: 18px;  
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text_light};
  font-family: ${props => props.theme.fonts.light};
  font-size: 16px;
`;

export const ButtonAction = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})``;

export const Icon = styled(Feather)`
  font-size: 28px;
`;

export const CardActions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
`;