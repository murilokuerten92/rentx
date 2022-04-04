import React, { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";

import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { StatusBar } from "expo-status-bar";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Car } from "../../components/Car";

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
}

export function Mycars() {
  const [cars, setCars] = useState<CarProps[]>();
  const [loading, setLoading] = useState(true);
  const { goBack } = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_byuser?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <BackButton onPress={() => goBack()} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel {"\n"}
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars?.length}</AppointmentsQuantity>
        </Appointments>

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Car data={item.car} />}
        />
      </Content>
    </Container>
  );
}
