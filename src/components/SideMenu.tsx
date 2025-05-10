import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  ShopOutlined,
  TagsOutlined,
  CarOutlined,
  RobotOutlined,
  ShoppingOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import './SideMenu.css';

const { Sider } = Layout;

export interface SideMenuProps {
  collapsed: boolean;
  onMenuClick: (key: string) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ collapsed, onMenuClick }) => {
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
        items={[
          {
            key: 'menu_prod',
            icon: <ShoppingOutlined />,
            label: '商品查詢',
          },
          {
            key: 'menu_order',
            icon: <FileTextOutlined />,
            label: '客戶訂單查詢',
          },
          {
            key: 'menu_scm',
            icon: <ShopOutlined />,
            label: '供應商查詢',
          },
          {
            key: 'menu_dely',
            icon: <CarOutlined />,
            label: '物流進度查詢',
          },
          {
            key: 'menu_consult',
            icon: <VideoCameraOutlined />,
            label: '商談管理',
            children: [
              {
                key: 'menu_consult_query',
                label: '查詢商談',
              },
              {
                key: 'menu_consult_create',
                label: '建立商談',
              },
              {
                key: 'menu_consult_process',
                label: '商談處理',
              },
            ],
          },
          {
            key: 'menu_ai',
            icon: <RobotOutlined />,
            label: 'AI Assistant',
          },
        ]}
        onClick={({ key }) => onMenuClick(key)}
      />
    </Sider>
  );
};

export default SideMenu; 