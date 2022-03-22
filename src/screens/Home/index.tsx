import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

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
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("cars");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleCarDetails() {
    navigate("CarDetails" as never, {} as never);
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
        data={cars}
        keyExtractor={(item: CarDTO) => item.id}
        renderItem={(item: CarDTO) => (
          <Car data={item} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
