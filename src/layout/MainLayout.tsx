import React, { useState } from 'react';
import { Layout, Menu, Button ,Card } from 'antd';
import ChatPanel from '../components/ChatPanel';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  RobotOutlined,
  PhoneOutlined,
  MessageOutlined,
  BookOutlined,
  BellOutlined,
  SettingOutlined,
  FileTextOutlined,
  ShopOutlined,
  TagsOutlined,
  CarOutlined,
  CloseOutlined
} from '@ant-design/icons';
import './MainLayout.css';


const { Header, Sider, Content } = Layout;



// 定義 LayoutComponent 組件
const MainLayout: React.FC = () => {
  // 設定側邊欄的折疊狀態
  const [collapsed, setCollapsed] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  // 返回 Layout 結構
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Menu Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
        {/* Logo */}
        <div 
            className="demo-logo-vertical" 
            style={{ background: '#001529', paddingTop: '6px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <div className="icon-container">
            <RobotOutlined className="icon" />
          </div>
          <span className="white-text" style={{ fontSize: '16px' }}>{!collapsed && 'AI CS Assistant'}</span>
        </div>
        {/* Menu */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="menu_order" icon={<UserOutlined />}>客戶訂單查詢</Menu.Item>
          <Menu.SubMenu key="menu_consult" icon={<VideoCameraOutlined />} title="商談管理">
            <Menu.Item key="menu_consult_query">查詢商談</Menu.Item>
            <Menu.Item key="menu_consult_create">建立商談</Menu.Item>
            <Menu.Item key="menu_consult_process">商談處理</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="menu_scm" icon={<ShopOutlined />}>供應商查詢</Menu.Item>
          <Menu.Item key="menu_prod" icon={<TagsOutlined />}>商品資訊查詢</Menu.Item>
          <Menu.Item key="menu_dely" icon={<CarOutlined />}>物流進度查詢</Menu.Item>
          <Menu.Item key="menu_ai" icon={<RobotOutlined />}>AI Assistant</Menu.Item>

        </Menu>
      </Sider>

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
         <div style={{ display: 'flex', flex: 1 , height: 'calc(100vh - 64px)' }}  >
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