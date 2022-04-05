
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { TouchableOpacityProps} from 'react-native';
interface TouchableType extends TouchableOpacityProps {
    color?: string;
    disabled?: boolean;
}

export const Container = styled.TouchableOpacity<TouchableType>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.disabled ? .5 : 1};
  background-color: ${props => props.color ? props.color : props.theme.colors.main};
  `;

export const Title = styled.Text`
 font-family: ${({ theme }) => theme.fonts.primary_500};
 font-size: ${RFValue(15)}px;
 color: ${({ theme }) => theme.colors.shape};
`;