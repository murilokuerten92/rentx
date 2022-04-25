import React from "react";

import { Container, Title } from "./styles";

import { Load } from "../Load";
import { useTheme } from "styled-components";
interface ButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  loading = false,
  disabled = false,
  light = false,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container {...rest} loading={loading} color={color} disabled={disabled}>
      {loading ? <Load color={theme.colors.shape} /> : <Title>{title}</Title>}
    </Container>
  );
}
