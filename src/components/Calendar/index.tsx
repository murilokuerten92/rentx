import React from "react";
import { Calendar as CustomCalendar, LocaleConfig } from "react-native-calendars";
import { Arrow } from "./styles";
import { useTheme } from "styled-components";

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
}

LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={(direction) => <Arrow direction={direction} />}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        marginBottom: 10,
        paddingBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}

      firstDay={1}
  
    />
  );
}
