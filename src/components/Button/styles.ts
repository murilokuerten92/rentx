
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { TouchableOpacityProps} from 'react-native';
interface TouchableType extends TouchableOpacityProps {
    color?: string;
    disabled?: boolean;
    loading?: boolean;
}

interface ButtonTextProps {
  light: boolean;
}

export const Container = styled.TouchableOpacity<TouchableType>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled || props.loading ? .5 : 1};
  background-color: ${props => props.color ? props.color : props.theme.colors.main};
  margin-bottom: 8px;
  `;

export const Title = styled.Text<ButtonTextProps>`
 font-family: ${({ theme }) => theme.fonts.primary_500};
 font-size: ${RFValue(15)}px;
 color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`;