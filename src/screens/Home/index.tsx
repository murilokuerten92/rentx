import React from "react";
import { StatusBar } from 'expo-status-bar';
import { Container, Header, TotalCars, HeaderContent } from "./styles";

import Logo from '../../assets/logo.svg';

export function Home() {
  return (
    <Container>
      <StatusBar style='light' translucent backgroundColor='transparent'/>
      <Header>
        <HeaderContent>
        <Logo  />

        <TotalCars>
          Total de 12 carros
        </TotalCars>
        </HeaderContent>
      </Header>

    </Container>
  );
}
