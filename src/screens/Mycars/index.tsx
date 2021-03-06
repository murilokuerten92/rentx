import React, { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";

import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { useTheme } from "styled-components";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { FlatList } from "react-native";
import { Car } from "../../components/Car";
import { Car as ModelCar } from "../../database/model/Car";
import { LoadAnimation } from "../../components/LoadAnimation";
import { format, parseISO } from "date-fns";

interface CarProps {
  car: CarDTO;
  id: string;
  user_id: string;
  startDate: string;
  endDate: string;
}

interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function Mycars() {
  const [cars, setCars] = useState<DataProps[]>();
  const [loading, setLoading] = useState(true);
  const screenIsFocus = useIsFocused();
  const { goBack } = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/rentals");
        const dataFormatted = response.data.map((data: DataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), "dd/MM/yyyy"),
            end_date: format(parseISO(data.end_date), "dd/MM/yyyy"),
          };
        });
        setCars(dataFormatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [screenIsFocus]);

  return (
    <Container>
      <Header>
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <BackButton onPress={() => goBack()} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de in??cio e {"\n"}
          fim do aluguel {"\n"}
        </Title>

        <SubTitle>Conforto, seguran??a e praticidade.</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars?.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Per??odo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
