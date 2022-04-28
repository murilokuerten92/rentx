import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibilityButton,
} from "./styles";
import { useTheme } from "styled-components";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <ChangePasswordVisibilityButton onPress={handlePasswordVisibilityChange}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
}
