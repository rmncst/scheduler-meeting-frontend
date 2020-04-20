import React, {useState} from "react";
import {Button, Form, Input, Modal, Radio} from 'antd';
import {useRequest} from "../../Hooks/useRequest";

export function ScheduleForm(props) {
    const {
        visible,
        dateSelected,
        roomSelected,
        hoursSelected,
        setVisible
    } = props;

    const scheling = useRequest('api/scheduling', 'POST');
    const [obs, setObs] = useState(null)
    const [form] = Form.useForm();

    async function tryScheduler() {
        for(let i = 0; i < hoursSelected.length; i++) {
            let item = hoursSelected[i];
            await scheling.load(null, JSON.stringify({
                "schedulingStart": item.schedulingStart,
                "schedulingEnd": item.schedulingEnd,
                "Room": { "MeetingRoomId" : roomSelected },
                "observation": obs
            }))
            console.log('foi 1');
        }
        setVisible(false)
    }

    return (
        <Modal
            title={'Novo Agendamento de Sala'}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
        >
            <Form form={form}
            >
                {/*<Form.Item label="Data Selecionada">*/}
                {/*    <Input placeholder="input placeholder" value={dateSelected} disabled={true} />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Sala Selecionada">*/}
                {/*    <Input placeholder="input placeholder" value={roomSelected} disabled={true} />*/}
                {/*</Form.Item>*/}
                {/*<Form.Item label="Horário(s) Selecionado(s)">*/}
                {/*    <Input placeholder="input placeholder" value={hoursSelected.map(h => h.key)} disabled={true} />*/}
                {/*</Form.Item>*/}
                <Form.Item label="Observações">
                    <Input placeholder="manter silêncio aos arredores...." value={obs} onChange={val => setObs(val.target.value)} multiline={true} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={tryScheduler}>Agendar</Button>
                </Form.Item>
            </Form>
        </Modal>
    )

}