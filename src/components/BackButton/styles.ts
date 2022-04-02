import styled from 'styled-components/native';

interface Props  {
    color?: string;
    size: number;
    name: string;
  }

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
 
`;

