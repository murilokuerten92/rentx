import React from "react";

import * as S from "./styles";

import { useTheme } from "styled-components";

import { BorderlessButtonProps } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();

  return (
    <S.Container {...rest}>
      <MaterialIcons
        name='chevron-left'
        size={24}
        color={color ? color : theme.colors.text}
      />
    </S.Container>
  );
}
