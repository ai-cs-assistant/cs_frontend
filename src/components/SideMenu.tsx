import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  ShopOutlined,
  TagsOutlined,
  CarOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import './SideMenu.css';

const { Sider } = Layout;

interface SideMenuProps {
  collapsed: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed }) => {
  return (
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
        defaultSelectedKeys={['menu_prod']}
      >
        <Menu.Item key="menu_prod" icon={<TagsOutlined />}>商品資訊查詢</Menu.Item>
        <Menu.Item key="menu_order" icon={<UserOutlined />}>客戶訂單查詢</Menu.Item>
        <Menu.SubMenu key="menu_consult" icon={<VideoCameraOutlined />} title="商談管理">
          <Menu.Item key="menu_consult_query">查詢商談</Menu.Item>
          <Menu.Item key="menu_consult_create">建立商談</Menu.Item>
          <Menu.Item key="menu_consult_process">商談處理</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="menu_scm" icon={<ShopOutlined />}>供應商查詢</Menu.Item>
        <Menu.Item key="menu_dely" icon={<CarOutlined />}>物流進度查詢</Menu.Item>
        <Menu.Item key="menu_ai" icon={<RobotOutlined />}>AI Assistant</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideMenu; 