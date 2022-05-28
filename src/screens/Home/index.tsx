import React, { useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Container, Header, TotalCars, HeaderContent } from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { FlatList, StyleSheet } from "react-native";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../../database";

import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Car as ModelCar } from "../../database/model/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

export type RootStackParamList = {
  CarDetails: { car: ModelCar };
};

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);
  const netInfo = useNetInfo();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function offlineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("/users/sync", user);
      },
    });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = await database.get<ModelCar>("cars");

        const cars = await carCollection.query().fetch();

        if (isMounted) {
          setCars(cars);
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

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

  function handleCarDetails(car: ModelCar) {
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
          renderItem={( { item }) => (
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
