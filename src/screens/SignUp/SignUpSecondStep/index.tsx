import React, { useState } from "react";
import { BackButton } from "../../../components/BackButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";
import { Bullet } from "../../../components/Bullet";
import { PasswordInput } from "../../../components/PasswordInput";
import { Button } from "../../../components/Button";
import { useTheme } from "styled-components";
import { userRegisterDatas } from "../SignUpFirstStep";

interface Params {
  user: userRegisterDatas;
}

export function SignUpSecondStep() {
  const { goBack } = useNavigation();
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação dela.");
    };

    if (password  !== passwordConfirm) {
      return Alert.alert("As senha não são iguais.");
    };

    try {
    } catch (error) {}
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{"\n"} conta</Title>
          <SubTitle>
            Faça seu cadastro de {"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              placeholder="Senha"
            />
            <PasswordInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              iconName="lock"
              placeholder="Repetir Senha"
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
