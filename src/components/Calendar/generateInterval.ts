import { 
    eachDayOfInterval,
    format
} from 'date-fns';

import theme from '../../styles/theme';

import { getPlatformDate } from '../../utils/getPlatformDate';

import {DayProps, MarkedDatesProps} from '.';

export function generateInterval(start: DayProps, end: DayProps){
    let interval: MarkedDatesProps = {};

    eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp)}).forEach(date =>{
        const dateParsed = format(getPlatformDate(date), 'yyyy-MM-dd');

        interval = {
            ...interval,
            [dateParsed]:
            {
            color: start.dateString  === dateParsed || end.dateString === dateParsed ? theme.colors.main : theme.colors.main_light, 
            textColor: start.dateString  === dateParsed || end.dateString === dateParsed ? theme.colors.main_light : theme.colors.main,
            }   
        }
    });

    return interval;
}