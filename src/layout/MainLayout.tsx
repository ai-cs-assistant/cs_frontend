import React, { useState } from 'react';
import { Layout, Menu, Button ,Card } from 'antd';
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
import './Chat.css';

const { Header, Sider, Content } = Layout;

const messages = [
    {
      role: "agent",
      message: "我能推薦什麼商品給這位買了咖啡機的客戶？"
    },
    {
      role: "assistant",
      message: "這位客戶購買了「濃縮咖啡機」，根據常見搭配，推薦以下加購商品：\n\n- 不銹鋼奶泡杯（95 元）\n- 義式濾網組（199 元）\n- 咖啡豆 1kg（會員價 299 元）\n\n是否要我幫您生成一段推銷訊息？"
    },
    {
      role: "agent",
      message: "好，幫我寫一段自然一點的話。"
    },
    {
      role: "assistant",
      message: "您可以回覆客戶：\n\n「為了讓您的咖啡體驗更完整，我們推薦幾項加購好物：奶泡杯、濾網組，還有優惠的咖啡豆組合，歡迎參考哦 ☕」\n\n要幫您一鍵送出嗎？"
    }
  ];



// 定義 LayoutComponent 組件
const MainLayout: React.FC = () => {
  // 設定側邊欄的折疊狀態
  const [collapsed, setCollapsed] = useState(false);
  const [chatVisible, setChatVisible] = useState(true);

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
          {chatVisible && (
            <div style={{ margin: '24px 16px 24px 0', width: '500px', flexShrink: 0 }}>
              <Card
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>AI 聊天室</span>
                    <CloseOutlined style={{ cursor: 'pointer' }} onClick={() => setChatVisible(false)} />
                    </div>
                }
                style={{
                    height: '100%',
                    borderRadius: 8,
                    display: 'flex',
                    flexDirection: 'column',
                }}
                bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0 }}
                >
                {/* 聊天訊息區（上方） */}

                <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                    {messages.map((msg, index) => (
                        <div
                        key={index}
                        className={`chat-message ${msg.role === 'assistant' ? 'left' : 'right'}`}
                        >
                        <div className={`bubble ${msg.role === 'assistant' ? 'ai' : 'user'}`}>
                            {msg.role === 'assistant' ? 'AI：' : ''}{msg.message.split('\n').map((line, i) => (
                            <div key={i}>{line}</div>
                            ))}
                        </div>
                        </div>
                    ))}
                </div>


                {/* <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                    <div className="chat-message left">
                        <div className="bubble ai">AI：您好，有什麼可以幫助您的？</div>
                    </div>
                    <div className="chat-message right">
                        <div className="bubble user">我想查詢訂單狀態</div>
                    </div>
                    <div className="chat-message left">
                        <div className="bubble ai">AI：您好，有什麼可以幫助您的？</div>
                    </div>
                    <div className="chat-message right">
                        <div className="bubble user">我想查詢訂單狀態</div>
                    </div>
                </div> */}


                {/* 輸入框區（下方） */}
                <div style={{
                    padding: '12px 16px',
                    borderTop: '1px solid #f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <input
                    type="text"
                    placeholder="請輸入訊息..."
                    style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d9d9d9',
                        borderRadius: 4,
                        marginRight: 8,
                    }}
                    />
                    <Button type="primary">送出</Button>
                </div>
                </Card>
            </div>
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 