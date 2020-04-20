import React, {useEffect} from "react";
import {Calendar, Empty} from "antd";
import Title from "antd/es/typography/Title";

export default function CalendarView(props) {

    const {
        roomSelected,
        selectedDate,
        onDateSelected
    } = props;

    const onSelectData = date => {
        onDateSelected(date.format('YYYY-MM-DD'));
    };

    useEffect(() => {
        onDateSelected((new Date().toISOString().substring(0,10)))
    }, []);


    return (
        <>
            <Title level={3}>2 - Selecione uma Data</Title>
            <Calendar fullscreen={false} onSelect={onSelectData} />
        </>
    )

}