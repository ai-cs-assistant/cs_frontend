import React, { useState, useEffect } from 'react';
import { Layout, Button, Card, message } from 'antd';
import ChatPanel from '../components/ChatPanel';
import SideMenu from '../components/SideMenu';
import ProductSearch from '../pages/ProductSearch';
import OrderSearch from '../pages/OrderSearch';
import SupplierSearch from '../pages/SupplierSearch';
import DeliverySearch from '../pages/DeliverySearch';
import authService from '../services/authService';

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

// 定義內容類型
type ContentType = 'menu_prod' | 'menu_order' | 'menu_consult' | 'menu_consult_query' | 'menu_consult_create' | 'menu_consult_process' | 'menu_scm' | 'menu_dely' | 'menu_ai' | 'default';

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentType>('menu_prod');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user?.token) {
      setToken(user.token);
    } else {
      message.error('請先登入系統');
      window.location.href = '/login';
    }
  }, []);

  // 渲染當前內容
  const renderContent = () => {
    switch (currentContent) {
      case 'menu_prod':
        return <ProductSearch />;
      case 'menu_order':
        return <OrderSearch />;
      case 'menu_scm':
        return <SupplierSearch />;
      case 'menu_dely':
        return <DeliverySearch />;
      case 'menu_consult':
      case 'menu_consult_query':
      case 'menu_consult_create':
      case 'menu_consult_process':
        return <div>商談管理功能開發中...</div>;
      case 'menu_ai':
        return <div>AI Assistant 功能開發中...</div>;
      default:
        return <ProductSearch />;
    }
  };

  // 處理選單項目點擊
  const handleMenuClick = (key: string) => {
    setCurrentContent(key as ContentType);
    if (key === 'menu_ai') {
      setChatVisible(true);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {/* Side Menu Component */}
      <SideMenu 
        collapsed={collapsed} 
        onMenuClick={handleMenuClick}
      />

      <Layout style={{ flex: 1, overflow: 'hidden' }}>
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
        <div style={{ display: 'flex', flex: 1, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
          {/* Main Content */}
          <Content style={{ 
            margin: '24px 16px', 
            flex: 1,
            minWidth: 0, // 防止內容溢出
            overflow: 'auto' // 允許內容區域滾動
          }}>
            <Card
              style={{ height: '100%', borderRadius: 8 }}
              bodyStyle={{ height: '100%', overflow: 'auto' }}
            >
              {renderContent()}
            </Card>
          </Content>

          {/* Chat Panel */}
          {chatVisible && token && (
            <ChatPanel 
              onClose={() => setChatVisible(false)} 
              token={token}
            />
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 