import React from "react";

import { StatusBar } from 'expo-status-bar';
import { Container, Header, TotalCars, HeaderContent } from "./styles";

import Logo from '../../assets/logo.svg';
import { RFValue} from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';

const carOne = {
  brand: 'audi',
  name: 'R$ 5 coupé',
  rent: {
    period: 'AO DIA',
    price: 120
  },
  thumbnail: ''
}

export function Home() {
  return (
    <Container>

      <StatusBar style='light' translucent backgroundColor='transparent'/>
      <Header>
        <HeaderContent>
        <Logo width={RFValue(108)} height={RFValue(12)}  />

        <TotalCars>
          Total de 12 carros
        </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carOne} />

    </Container>
  );
}
