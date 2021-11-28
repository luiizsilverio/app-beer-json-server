import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  justify-content: space-between;
  `;

export const Form = styled.View`
  flex: 1;
  padding: 16px 16px;
`;

export const ButtonContainer = styled.View`
  padding: 16px;
`;