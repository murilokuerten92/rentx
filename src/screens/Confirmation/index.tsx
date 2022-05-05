import React from "react";

import { useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";

import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { StatusBar } from "expo-status-bar";

import { useNavigation, useRoute } from "@react-navigation/native";

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

export function Confirmation() {
  const { width } = useWindowDimensions();

  const { navigate } = useNavigation();

  const route = useRoute();

  const { title, message, nextScreenRoute }  = route.params as Params;

  function handleConfirm() {
    navigate(nextScreenRoute as never);
  }

  return (
    <Container>
      <StatusBar style='light' translucent backgroundColor='transparent' />
      <LogoSvg width={width} />

     
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>
            {message}
        </Message>
      </Content>

      <Footer>
          <ConfirmButton title='OK' onPress={handleConfirm} />
      </Footer>
    </Container>
  );
}
