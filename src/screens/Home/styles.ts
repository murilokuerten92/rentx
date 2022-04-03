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

export const MyCarsButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 60px;
  height: 60px;

  justify-content: center;
  align-items: center;

  border-radius: 30px;
  position: absolute;
  bottom: 13px;
  right: 22px;

  background-color: ${({theme}) => theme.colors.main};
`;
