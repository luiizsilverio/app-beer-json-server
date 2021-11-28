import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  height: 100%;
  background-color: ${props => props.theme.colors.background};
  justify-content: space-between;
  padding: 24px;
  /* padding-top: 16px; */
  `;

export const Form = styled.View`
  flex: 1;
`;

export const ButtonContainer = styled.View`
`;

export const Label = styled.Text`
  color: ${props => props.theme.colors.text_light};
  font-family: ${props => props.theme.fonts.light};
  font-size: 18px;
  margin-bottom: 6px;
`;
