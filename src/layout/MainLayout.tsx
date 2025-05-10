import React, { useState } from 'react';
import { Layout, Button, Card } from 'antd';
import ChatPanel from '../components/ChatPanel';
import SideMenu from '../components/SideMenu';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
  MessageOutlined,
  BookOutlined,
  BellOutlined,
  SettingOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './MainLayout.css';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Side Menu Component */}
      <SideMenu collapsed={collapsed} />

      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: 0,
            background: '#001529',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '24px' }} /> : <MenuFoldOutlined style={{ fontSize: '24px' }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              color: '#fff',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <PhoneOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
            <MessageOutlined
              style={{ fontSize: '20px', color: '#fff', marginRight: '16px', cursor: 'pointer' }}
              onClick={() => setChatVisible(true)}
            />
            <BellOutlined style={{ fontSize: '20px' , color: '#fff', marginRight: '16px'}} />
            <BookOutlined style={{ fontSize: '20px' , color: '#fff', marginRight: '16px'}} />
            <SettingOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
            <PhoneOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
            <FileTextOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
            <UserOutlined style={{ fontSize: '20px', color: '#fff', marginRight: '16px' }} />
            <Button className="glassy-button" onClick={() => setChatVisible(true)}>AI 助手</Button>
          </div>
        </Header>
        
        {/* Main Content + Chat */}
        <div style={{ display: 'flex', flex: 1 , height: 'calc(100vh - 64px)' }}>
          {/* Main Content */}
          <Content style={{ margin: '24px 16px', flex: 1 }}>
            <Card
              title="主內容區塊"
              style={{ height: '100%', borderRadius: 8 }}
              bodyStyle={{ height: '100%', overflow: 'auto' }}
            >
              這裡是主內容
            </Card>
          </Content>

          {/* Chat Panel */}
          {chatVisible && <ChatPanel onClose={() => setChatVisible(false)} />}
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 