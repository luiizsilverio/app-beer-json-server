import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};  
  align-items: center;
  justify-content: center;
`;

export const SenhaContainer = styled.View`
  background-color: ${props => props.theme.colors.back_light};  
  border-radius: 20px;
  align-items: center;
  width: 85%;
  padding: 20px;
  padding-bottom: 8px;
`;

export const Title = styled.Text`
  color: ${props => props.theme.colors.text_white};
  font-family: ${props => props.theme.fonts.bold};
  font-size: 20px;
  padding-top: 20px;
  padding-bottom: 8px;
`;

export const InputContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.back_darker};
  border-radius: 8px;
  align-items: center;
  flex-direction: row;
  justify-content: center;  
  position: relative;
  padding: 8px;
  height: 52px;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  /* flex: 1; */
  width: 90%;
  font-family: ${props => props.theme.fonts.regular};
  font-size: 18px;
  text-align: center;
  color: ${props => props.editable
    ? props.theme.colors.text_light
    : props.theme.colors.text_gray
  };
`;
