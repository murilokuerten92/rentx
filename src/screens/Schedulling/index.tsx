import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import {
  Calendar,
  DayProps,
  MarkedDatesProps,
  generateInterval,
} from "../../components/Calendar";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import ArrowSvg from "../../assets/arrow.svg";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarDTO } from "../../dtos/CarDTO";
interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export type RootStackParamList = {
  SchedulingDetails: { car: CarDTO, dates: string[] };
};
interface Params {
  car: CarDTO;
}

export function Schedulling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const theme = useTheme();
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const { navigate, goBack } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute();

  const { car } = route.params as Params;

  function handleConfirmRental() {

      navigate("SchedulingDetails", {
        car,
        dates: Object.keys(markedDates)
      });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);

    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

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

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" disabled={!(!!rentalPeriod.endFormatted)} onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
