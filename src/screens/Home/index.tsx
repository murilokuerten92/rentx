import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  MyCarsButton,
} from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { FlatList } from "react-native";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { useTheme } from "styled-components";

import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";

export type RootStackParamList = {
  CarDetails: { car: CarDTO };
};

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigate("CarDetails", {
      car,
    });
  }

  function handleOpenMyCars() {
    navigate("MyCars" as never);
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Load />
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
          contentContainerStyle={{
            padding: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
}
