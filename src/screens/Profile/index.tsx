import React, { useState } from "react";

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
} from "./styles";

import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";
import { useNavigation } from "@react-navigation/native";

export function Profile() {
  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const theme = useTheme();

  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  function handleSignOut() {}

  function handleOptionChange(optionSelected: "dataEdit" | "passwordEdit") {
    setOption(optionSelected);
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <HeaderTitle>Editar Perfil</HeaderTitle>
          <LogoutButton onPress={handleSignOut}>
            <Feather name="power" size={24} color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/63013634?v=4",
            }}
          />
          <PhotoButton onPress={() => {}}>
            <Feather name="camera" size={24} color={theme.colors.shape} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
      <Content>
        <Options>
          <Option
            active={option === "dataEdit"}
            onPress={() => handleOptionChange("dataEdit")}
          >
            <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
          </Option>
          <Option
            active={option === "passwordEdit"}
            onPress={() => handleOptionChange("passwordEdit")}
          >
            <OptionTitle active={option === "passwordEdit"}>
              Trocar senha
            </OptionTitle>
          </Option>
        </Options>
      </Content>
    </Container>
  );
}
