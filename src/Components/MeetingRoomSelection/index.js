import React, {useEffect} from "react";
import Title from "antd/es/typography/Title";
import {Col, Row, Select} from "antd";
import {useRequest} from "../../Hooks/useRequest";

export function MeetingRoomSelection(props) {

    const {
        onRoomSelected,
        roomSelected
    } = props;

    const rooms = useRequest('api/meeting-room', 'GET', null);
    useEffect(() => {
        rooms.load();
    }, []);

    return (
        <div style={{marginBottom: 16, width: '100%'}}>
            <Title level={3}>1 - Selecione uma Sala de Reunião</Title>
            <Select  style={{width: '100%'}}  onChange={onRoomSelected} defaultValue={roomSelected} >
                <Select.Option value={null}>{rooms.loading ? 'Carregando...' : 'Selecione um valor'}</Select.Option>
                {
                    rooms.content.map(item => (
                        <Select.Option value={item.meetingRoomId}>{item.description}</Select.Option>
                    ))
                }
            </Select>
        </div>
    )
}