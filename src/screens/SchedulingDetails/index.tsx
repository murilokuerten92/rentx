import React, { useState, useEffect } from "react";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";
import { format } from "date-fns";
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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { getPlatformDate } from "../../utils/getPlatformDate";
import api from "../../services/api";
import { Alert } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

export type RootStackParamListConfirmation = {
  Confirmation: { title: string; message: string; nextScreenRoute: string };
};
interface RentalPeriod {
  start: string;
  end: string;
}
interface Params {
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails() {
  const theme = useTheme();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  const [loading, setLoading] = useState(false);
  const { navigate, goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamListConfirmation>>();
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  const route = useRoute();

  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    setLoading(true);

    await api.post('rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    }).then(() =>
        navigate("Confirmation", {
          nextScreenRoute: "Home",
          title: "Carro alugado!",
          message:
            "Agora é só precisa ir \n até e concessionária da RENTX \n pegar o seu automóvel",
        })
      )
      .catch(() => Alert.alert("It was not possible confirm schedulling"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  useEffect(() => {
    if (netInfo.isConnected === true) {
      (async () => {
        const response = await api.get(`/cars/${car.id}`);
        setCarUpdated(response.data);
      })();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()} />
      </Header>
      <CarImages>
      <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$ ${car.price}`}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}
        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${rentTotal}`}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          disabled={loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
