import React from "react";
import { BackButton } from "../../../components/BackButton";
import { NavigationHelpersContext, useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
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
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Button";

export function SignUpFirstStep() {
  const { goBack, navigate } = useNavigation();

  async function handleSignIn() {
   try {
     const schema = Yup.object().shape({
       email: Yup.string()
         .required("E-mail obrigatório")
         .email("Digite um e-mail válido"),
       password: Yup.string().required("A senha é obrigatória").min(6),
     });

     await schema.validate({ email, password });
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

  function handleBack() {
    goBack();
  };

  function handleNextStep(){
     navigate("SignUpSecondStep" as never);
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
            <FormTitle>1. Dados</FormTitle>

            <Input iconName="user" placeholder="Nome" />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="number-pad"
            />
          </Form>

          <Button title="Próximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
