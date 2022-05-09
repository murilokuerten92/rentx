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

import { CarDTO} from '../../dtos/CarDTO';
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
interface Props {
  data: CarDTO;
  onPress?: () => void;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`R$ ${data.price}`}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CardImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </Container>
  );
}
