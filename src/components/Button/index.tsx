import React from "react";

import { Container, Title } from "./styles";

import { Load } from "../Load";
import { useTheme } from "styled-components";
import { TouchableOpacityProps } from "react-native";
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
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
      {loading ? (
        <Load color={theme.colors.shape} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
}
