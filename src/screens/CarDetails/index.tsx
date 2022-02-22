import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About
} from "./styles";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202201/20220126/audi-a8-6.3-fsi-longo-w12-48v-gasolina-4p-tiptronic-wmimagem09445290484.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand></Brand>
            <Name></Name>
          </Description>
          <Rent>
            <Period></Period>
            <Price></Price>
          </Rent>
        </Details>
        <About>Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.</About>
      </Content>
    </Container>
  );
}
