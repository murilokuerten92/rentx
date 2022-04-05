import React from "react";

import { Container, Title } from "./styles";

import { useTheme } from 'styled-components';

import { TouchableOpacityProps} from 'react-native';

interface ButtonProps  {
  title: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, color, disabled = false,...rest }: ButtonProps) {


  return (
    <Container {...rest} color={color} disabled={disabled}>
      <Title>{title}</Title>
    </Container>
  );
}
