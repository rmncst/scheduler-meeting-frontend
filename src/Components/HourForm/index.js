import React, {useEffect, useState} from "react";
import Title from "antd/es/typography/Title";
import {Button, Col, Row, Table, Tag} from 'antd';
import {ScheduleForm} from "./ScheduleForm";
import {useRequest} from "../../Hooks/useRequest";
import {ModalInfo} from "./ModalInfo";


export default function HourForm(props) {

    const {
        roomSelected,
        dateSelected,
    } = props;

    const availableHours = useRequest(null, 'GET', null);
    const [hourFormVisible, setHourFormVisible] = useState(false);
    const [modalInfoVisible, setModalInfoVisible] = useState(false);
    const [currentInfo, setCurrentInfo] = useState(null);
    const [hoursSelected, setHoursSelected] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setHoursSelected(selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.status === 0,
            name: record.name,
        }),
        selections: hoursSelected
    };


    const cols = [
        {
            key: 'hour',
            title: 'Horário',
            dataIndex: 'hour',
        },
        {
            key: 'status',
            title: 'Status',
            dataIndex: 'status',
            render: value => <Tag color={value == '1' ? 'success' : 'warning' }  >{value == '1' ? 'Disponível' : 'Ocupado'}</Tag>
        },
        {
            title: 'Actions',
            key: 'action',
            render: (value, row) => {
                console.log(row);
                return (
                    row.room != null ?
                    <Button color={'primary'} size={'small'} onClick={() => { setCurrentInfo(row.schedulingId); setModalInfoVisible(true); }}>
                        + Info
                    </Button>
                        :
                       '--'
                )
            }
        }
    ];

    useEffect(() => {
        if(dateSelected !== null)
            if(roomSelected !== null)
                availableHours.load(`api/scheduling/available-in/${dateSelected}/${roomSelected}`);
    }, [roomSelected, dateSelected])


    const reset = () => {
        availableHours.load(`api/scheduling/available-in/${dateSelected}/${roomSelected}`).then(() =>
            setHoursSelected([]) );
    }

    function formatLabel(item) {
        const initialDate = new Date(item.schedulingStart);
        const finalDate = new Date(item.schedulingEnd);

        const initialHour = initialDate.getHours();
        const initialMinute = initialDate.getMinutes();
        const finalHour = finalDate.getHours();
        const finalMinutes = finalDate.getMinutes();

        return `${initialHour > 9 ? initialHour : '0' + initialHour}:${initialMinute > 9 ? initialMinute : '0' + initialMinute} -
                ${finalHour > 9 ? finalHour : '0' + finalHour}:${finalMinutes > 9 ? finalMinutes : '0' + finalMinutes}`;
    }

    return (
        <>
            <Title level={3}>3 - Selecione um Horário { dateSelected ? `(${dateSelected})` : null }</Title>
            {
                hoursSelected.length > 0 &&
                <Row>
                    <Col span={24} style={{textAlign: 'right', marginBottom: 10}}>
                        <Button type={'primary'} ghost={true} shape={'round'} onClick={() => setHourFormVisible(true)}>
                            Agendar Horários ({hoursSelected.length})
                        </Button>
                    </Col>
                </Row>
            }
            {availableHours.loading ? null : <Table
                locale={{emptyText: 'Nenhum horário disponível'}}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={cols}
                dataSource={
                    availableHours.content.map(
                        (item,idx) => ({
                            hour: formatLabel(item),
                            key: idx,
                            status: item.room == null ? 1 : 0,
                            ...item
                        })
                    )
                } />
            }

            <ModalInfo
                visible={modalInfoVisible}
                setVisible={setModalInfoVisible}
                currentInfo={currentInfo}
            />

            <ScheduleForm
                visible={hourFormVisible}
                setVisible={val => { setHourFormVisible(val); reset()} }
                dateSelected={dateSelected}
                roomSelected={roomSelected}
                hoursSelected={hoursSelected}
            />
        </>
    )
}