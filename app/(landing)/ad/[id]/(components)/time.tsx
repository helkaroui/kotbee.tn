"use client"

import moment from "moment";
import 'moment/locale/ar-tn';

type Props = {
    d: Date;
}
export const Time = ({d}: Props) => {
    return (
        <>{moment(d).locale('ar-tn').fromNow()}</>
    )
}