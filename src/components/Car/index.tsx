import React from "react";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CardImage,
} from "./styles";

import GasolineSvg from "../../assets/gasoline.svg";

import { RectButtonProps } from "react-native-gesture-handler";
interface CarData {
  id: string;
  brand: string;
  name: string;
  about: string;
  rent: {
      period: string;
      price: number;
  },
  fuel_type: string;
  thumbnail: string;
  accessories: {
      type: string;
      name: string;
  }[];
  photos: string[];
}

interface Props {
  data: CarData;
  onPress: () => void;
}

export function Car({ data, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>
          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CardImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
