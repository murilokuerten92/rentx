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
  value?: string;
}

export function PasswordInput({ iconName, value,  ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const theme = useTheme();

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather name={iconName} size={24} color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPasswordVisible} onFocus={handleInputFocus} onBlur={handleInputBlur} />

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
