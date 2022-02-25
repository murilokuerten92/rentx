import React from "react";
import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from "./styles";
import ArrowSvg from '../../assets/arrow.svg';
import { StatusBar } from "expo-status-bar";

export function Schedulling() {
  const theme = useTheme();

  return (
    <Container>
      <Header>
          <StatusBar style='light' translucent  backgroundColor='transparent'/>
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel {"\n"}
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
          <ArrowSvg />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>

      </Content>

      <Footer>
          <Button title='Confirmar' onPress={() => {}} />
      </Footer>
    </Container>
  );
}
