import React from "react";

import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";

import { StatusBar } from "expo-status-bar";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";

export function SignIn() {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Header>
        <Title>Estamos {"\n"}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar {"\n"}
          uma experiência incrível.
        </SubTitle>
      </Header>
      <Form>
        <Input iconName="mail"  />
      </Form>
      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          disabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          light
          color={theme.colors.background_secondary}
          onPress={() => {}}
          disabled={false}
          loading={false}
        />
      </Footer>
    </Container>
  );
}
