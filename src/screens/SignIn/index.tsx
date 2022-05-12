import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Header, Title, SubTitle, Footer, Form } from "./styles";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { StatusBar } from "expo-status-bar";
import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/auth";
import { database } from "../../database";

export function SignIn() {
  const theme = useTheme();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();

  useEffect(() => {
    (async () => {
      const userCollection = database.get("users");
      const users = await userCollection.query().fetch();

      console.log(users);
    })();
  }, []);

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Ocorreu um erro ao fazer login, verifique as credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigate("SignUpFirstStep" as never);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              disabled={false}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              light
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              disabled={false}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
