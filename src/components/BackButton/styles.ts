import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

interface Props  {
    color?: string;
    size: number;
    name: string;
  }

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
 
`;

