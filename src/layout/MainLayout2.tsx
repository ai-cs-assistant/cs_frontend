import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/Header';
import AppContent from '../components/Content';

const { colorBgContainer, borderRadiusLG } = { colorBgContainer: '#fff', borderRadiusLG: '10px' }; // Example values

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <AppHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
          borderRadiusLG={borderRadiusLG}
        />
        <AppContent colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
      </Layout>
    </Layout>
  );
};

export default MainLayout;