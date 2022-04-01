import React from "react";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
  DateData
} from "react-native-calendars";
import { Arrow } from "./styles";
import { useTheme } from "styled-components";
import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

LocaleConfig.locales["pt-br"] = ptBR;

LocaleConfig.defaultLocale = "pt-br";
interface MarkedDatesProps {
   [date: string]: {
     color: string;
     textColor: string;
     disabled?: boolean;
     disabledTouchEvent?: boolean;
   }
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDatesProps;
  onDayPress?: (date: DateData) => void; 
}

 function Calendar({ markedDates, onDayPress }: CalendarProps) {
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
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
      
      minDate={String(new Date())}
    />
  );
}

export {
  Calendar,
  MarkedDatesProps,
  DayProps,
  generateInterval
}
