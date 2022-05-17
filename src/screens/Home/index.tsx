import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Container, Header, TotalCars, HeaderContent } from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { FlatList, StyleSheet } from "react-native";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { LoadAnimation } from "../../components/LoadAnimation";

export type RootStackParamList = {
  CarDetails: { car: CarDTO };
};

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigate("CarDetails", {
      car,
    });
  }

  return (
    <Container>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && (
            <TotalCars>{`Total de ${cars.length} carros`}</TotalCars>
          )}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
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
    </Container>
  );
}
