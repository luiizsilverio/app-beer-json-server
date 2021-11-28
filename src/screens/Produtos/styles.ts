import styled from 'styled-components/native'
import { FlatList } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  /* padding: 16px; */
`;

export const Lista = styled(FlatList)
.attrs({
  contentContainerStyle: { padding: 16 },
  showsVerticalScrollIndicator: false,
  pagingEnabled: true
})`
  padding-bottom: 32px;  
`;
