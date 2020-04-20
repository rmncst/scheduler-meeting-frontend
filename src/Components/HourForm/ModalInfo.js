import React, {useEffect} from "react";
import {Button, Form, Input, Modal} from "antd";
import {useForm} from "antd/es/form/util";
import {useRequest} from "../../Hooks/useRequest";

export function ModalInfo(props) {

    const {
        visible,
        setVisible,
        currentInfo
    } = props;

    const detailsScheduling = useRequest(null, 'GET', null);

    useEffect(() => {
        if(currentInfo)
            detailsScheduling.load('api/scheduling/' + currentInfo)
    }, [currentInfo]);

    console.log(detailsScheduling.content);
    return (

        <Modal
            title={'Detalhes do Agendamento'}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
        >
            {
                detailsScheduling.content.schedulingId &&
                <>
                   <Form.Item label="Data Selecionada">
                        <Input placeholder="Agendado Para" value={detailsScheduling.content.schedulingStart} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Local Selecionado">
                        <Input placeholder="input placeholder" value={detailsScheduling.content.room.description} disabled={true} />
                    </Form.Item>
                    <Form.Item label="Observações">
                        <Input placeholder="manter silêncio aos arredores...." value={detailsScheduling.content.observation} multiline={true} />
                    </Form.Item>
                </>
            }
        </Modal>
    )
}