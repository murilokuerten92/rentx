import React from "react";
import { BackButton } from "../../../components/BackButton";
import { useNavigation } from "@react-navigation/native";

import { Container, Header, Steps, Title, SubTitle, Form, FormTitle } from "./styles";
import { Bullet } from "../../../components/Bullet";

export function SignUpFirstStep() {
  const { goBack } = useNavigation();

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
        <Steps>
          <Bullet active />
        </Steps>
      </Header>

      <Title>
         Crie sua{'\n'} conta
      </Title>
      <SubTitle>
         Faça seu cadastro de {'\n'}
         forma rápida e fácil
      </SubTitle>

      <Form>
         <FormTitle>
            1. Dados
         </FormTitle>
      </Form>
    </Container>
  );
}
