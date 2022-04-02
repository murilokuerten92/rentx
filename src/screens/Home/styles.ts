import styled from "styled-components/native";

import { RFValue } from 'react-native-responsive-fontsize';

import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => Platform.OS === 'ios' ? theme.colors.background_secondary: theme.colors.shape};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.header};
  width: 100%;
  height: 113px;

  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  color: ${({ theme }) => theme.colors.background_secondary};
  font-size: ${RFValue(15)}px;
`;

