import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

// export const Container = styled.View`
export const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding: 24px;
`;