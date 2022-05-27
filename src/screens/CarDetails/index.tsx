import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar } from "react-native";

import { Car as ModelCar } from "../../database/model/Car";
import { CarDTO } from "../../dtos/CarDTO";

import { getAccessoryIcon } from "../../utils/getAccessoryIcon";

import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";
import { Button } from "../../components/Button";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  AnimatedHeaderAndSlider,
  AnimatedCarImages,
  AnimatedContent,
  OfflineInfo,
} from "./styles";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import api from "../../services/api";
import { useNetInfo } from "@react-native-community/netinfo";
interface Params {
  car: ModelCar;
}

export type RootStackParamList = {
  Schedulling: { car: ModelCar };
};

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const netInfo = useNetInfo();
  const { navigate, goBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const { car } = route.params as Params;
  const statusBarHeight = getStatusBarHeight();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, statusBarHeight + 50],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleChooseRentalPeriod() {
    navigate("Schedulling", { car });
  }

  function handleGoBack() {
    goBack();
  }

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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <Header>
          <BackButton onPress={handleGoBack} />
        </Header>

        <AnimatedCarImages style={sliderCarsStyleAnimation}>
          <ImageSlider
            imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            }
          />
        </AnimatedCarImages>
      </AnimatedHeaderAndSlider>

      <AnimatedContent onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : "..."}</Price>
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

        <About>{car.about}</About>
      </AnimatedContent>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleChooseRentalPeriod}
          disabled={netInfo.isConnected === true}
        />

        {netInfo.isConnected === false && (
          <OfflineInfo>
            Conecte-se a Internet para ver mais detalhes e agendar seu carro.
          </OfflineInfo>
        )}
      </Footer>
    </Container>
  );
}
