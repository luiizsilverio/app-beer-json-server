import styled from 'styled-components/native'
import { useApp } from '../../contexts'

interface MesaProps {
  ocupado: boolean
  fechar?: boolean
  width: number
  height: number
}

export const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 8px;
  width: 100%;
`;

// h: 100, w:100 cabe ate 15 mesas
// h: 100, w:80 cabe ate 20 mesas
// h:85, w:80 cabe ate 24 mesas
export const Container = styled.View<MesaProps>`
  height: ${props => props.height}px; //100px;
  width: ${props => props.width}px;   //100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border-color: ${props => props.theme.colors.text_white};
  border-width: 4px;
  margin: ${props => props.height === 85 ? 6 : 8}px;
  background-color: ${props => props.ocupado 
    ? props.theme.colors.table 
    : props.theme.colors.empty_table
  };  
`;

interface Props {
  fechar?: boolean
}

export const Title = styled.Text<Props>`
  font-family: ${props => props.theme.fonts.bold};  
  font-size: 24px;
  color: ${props => props.fechar
    ? 'yellow' // props.theme.colors.secondary 
    : props.theme.colors.text_table
  };
`;
