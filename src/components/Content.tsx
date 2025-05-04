import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface ContentProps {
  colorBgContainer: string;
  borderRadiusLG: string;
}

const AppContent: React.FC<ContentProps> = ({ colorBgContainer, borderRadiusLG }) => {
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      Content
    </Content>
  );
};

export default AppContent;