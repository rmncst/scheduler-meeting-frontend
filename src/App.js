import React, {useEffect, useState} from 'react';
import './App.css';
import {Col, Divider, Layout, Menu, Row, Typography} from "antd";
import CalendarView from "./Components/Calendar";
import HourForm from "./Components/HourForm";
import {useRequest} from "./Hooks/useRequest";
import {MeetingRoomSelection} from "./Components/MeetingRoomSelection";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
    const [roomSelected, onRoomSelected] = useState(null);
    const [selectedDate, onDateSelected] = useState(null);

    console.log(roomSelected, selectedDate);
      return (
          <Layout className="layout">
              <Header>
                  <div className="logo" />
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                      {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
                      {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                      {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                  </Menu>
              </Header>
              <Content style={{ padding: '0 50px', backgroundColor: 'white' }}>
                  <Row>
                      <Col span={12} style={{padding: '20px'}}>
                          <Row>
                              <MeetingRoomSelection
                                  roomSelected={roomSelected}
                                  onRoomSelected={onRoomSelected}
                              />
                          </Row>
                          <Row>
                              <CalendarView
                                  roomSelected={roomSelected}
                                  selectedDate={selectedDate}
                                  onDateSelected={onDateSelected}
                              />
                          </Row>
                      </Col>
                      <Col span={12} style={{padding: '20px'}}>
                          <HourForm
                            roomSelected={roomSelected}
                            dateSelected={selectedDate}
                          />
                      </Col>
                  </Row>
              </Content>
          </Layout>
      );
}

export default App;
