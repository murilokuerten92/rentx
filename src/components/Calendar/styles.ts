import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

type IconProps = {
    direction: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Arrow = styled(Feather).attrs<IconProps>(({ theme, direction }) => ({
   size: 24,
   color: theme.colors.shape,
   name: direction === 'left' ? 'chevron-left' : 'chevron-right'
}))``;