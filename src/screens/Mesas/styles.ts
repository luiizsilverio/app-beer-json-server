import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

// export const Container = styled.View`
export const Container = styled(LinearGradient)`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  background-color: ${props => props.theme.colors.background};
  padding-top: 16px;
  padding-bottom: 16px;
`;
