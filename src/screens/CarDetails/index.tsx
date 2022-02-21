import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { Container, Header, CarImages } from "./styles";

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
    </Container>
  );
}
