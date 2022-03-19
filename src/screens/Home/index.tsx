import React from "react";

import { StatusBar } from "expo-status-bar";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
const carOne = {
  brand: "audi",
  name: "R$ 5 coupé",
  rent: {
    period: "AO DIA",
    price: 120,
  },
  thumbnail:
    "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202201/20220126/audi-a8-6.3-fsi-longo-w12-48v-gasolina-4p-tiptronic-wmimagem09445290484.png",
};

export function Home() {
  const { navigate } = useNavigation();

  function handleCarDetails() {
    navigate('CarDetails' as never, {} as never);
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />

          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={(item) => String(item)}
        renderItem={({ item }) => (
          <Car data={carOne} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
