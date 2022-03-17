import React from "react";
import { Acessory } from "../../components/Acessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Feather } from "@expo/vector-icons";
import speedSvg from "../../assets/speed.svg";
import acceleationSvg from "../../assets/acceleration.svg";
import forceSvg from "../../assets/force.svg";
import gasolineSvg from "../../assets/gasoline.svg";
import exchangeSvg from "../../assets/exchange.svg";
import peopleSvg from "../../assets/people.svg";

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

  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

export function SchedulingDetails() {

  const theme = useTheme();

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://image.webmotors.com.br/_fotos/AnuncioUsados/gigante/2022/202201/20220126/audi-a8-6.3-fsi-longo-w12-48v-gasolina-4p-tiptronic-wmimagem09445290484.png",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand></Brand>
            <Name></Name>
          </Description>
          <Rent>
            <Period></Period>
            <Price></Price>
          </Rent>
        </Details>
        <Acessories>
          <Acessory name="380Km/h" icon={speedSvg} />
          <Acessory name="3.2s" icon={acceleationSvg} />
          <Acessory name="800 HP" icon={forceSvg} />
          <Acessory name="Gasolina" icon={gasolineSvg} />
          <Acessory name="Auto" icon={exchangeSvg} />
          <Acessory name="2 pessoas" icon={peopleSvg} />
        </Acessories>
        <RentalPeriod>
          <CalendarIcon>
            <Feather name='calendar' size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>
            </DateTitle>
            <DateValue>

            </DateValue>
          </DateInfo>

          <CalendarIcon>
            <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>
            </DateTitle>
            <DateValue>

            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Content>
      <Footer>
        <Button title="Confirmar" onPress={() => {}} />
      </Footer>
    </Container>
  );
}
