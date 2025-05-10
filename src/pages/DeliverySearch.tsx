import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Row, Col, Select, DatePicker, Form, Tag, Steps } from 'antd';
import { SearchOutlined, CarOutlined, ShopOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface Delivery {
  id: string;
  orderId: string;
  customerName: string;
  shippingMethod: string;
  trackingNumber: string;
  status: string;
  currentLocation: string;
  estimatedDelivery: string;
  actualDelivery: string;
  items: number;
  shippingFee: number;
  address: string;
  history: {
    time: string;
    status: string;
    location: string;
    description: string;
  }[];
}

const mockDeliveries: Delivery[] = [
  {
    id: 'DEL20240301001',
    orderId: 'ORD20240301001',
    customerName: '王小明',
    shippingMethod: '宅配',
    trackingNumber: 'SF1234567890',
    status: '配送中',
    currentLocation: '台北市信義區配送站',
    estimatedDelivery: '2024-03-02',
    actualDelivery: '-',
    items: 3,
    shippingFee: 100,
    address: '台北市信義區信義路五段7號',
    history: [
      {
        time: '2024-03-01 08:00',
        status: '已收件',
        location: '台北市信義區配送站',
        description: '包裹已收件'
      },
      {
        time: '2024-03-01 10:30',
        status: '處理中',
        location: '台北市信義區配送站',
        description: '包裹正在處理中'
      },
      {
        time: '2024-03-01 14:00',
        status: '配送中',
        location: '台北市信義區配送站',
        description: '包裹已開始配送'
      }
    ]
  },
  {
    id: 'DEL20240301002',
    orderId: 'ORD20240301002',
    customerName: '李小華',
    shippingMethod: '超商取貨',
    trackingNumber: 'CV9876543210',
    status: '已送達',
    currentLocation: '全家便利商店信義店',
    estimatedDelivery: '2024-03-01',
    actualDelivery: '2024-03-01',
    items: 1,
    shippingFee: 60,
    address: '台北市信義區松仁路100號',
    history: [
      {
        time: '2024-03-01 09:00',
        status: '已收件',
        location: '台北市信義區配送站',
        description: '包裹已收件'
      },
      {
        time: '2024-03-01 11:00',
        status: '處理中',
        location: '台北市信義區配送站',
        description: '包裹正在處理中'
      },
      {
        time: '2024-03-01 13:00',
        status: '配送中',
        location: '全家便利商店信義店',
        description: '包裹已開始配送'
      },
      {
        time: '2024-03-01 15:00',
        status: '已送達',
        location: '全家便利商店信義店',
        description: '包裹已送達門市'
      }
    ]
  },
  {
    id: 'DEL20240302001',
    orderId: 'ORD20240302001',
    customerName: '張大偉',
    shippingMethod: '宅配',
    trackingNumber: 'SF2345678901',
    status: '已送達',
    currentLocation: '新北市中和區配送站',
    estimatedDelivery: '2024-03-02',
    actualDelivery: '2024-03-02',
    items: 5,
    shippingFee: 100,
    address: '新北市中和區中正路123號',
    history: [
      {
        time: '2024-03-02 08:00',
        status: '已收件',
        location: '新北市中和區配送站',
        description: '包裹已收件'
      },
      {
        time: '2024-03-02 10:00',
        status: '處理中',
        location: '新北市中和區配送站',
        description: '包裹正在處理中'
      },
      {
        time: '2024-03-02 12:00',
        status: '配送中',
        location: '新北市中和區配送站',
        description: '包裹已開始配送'
      },
      {
        time: '2024-03-02 14:00',
        status: '已送達',
        location: '新北市中和區配送站',
        description: '包裹已送達'
      }
    ]
  }
];

const deliveryStatus = [
  { value: '已收件', label: '已收件' },
  { value: '處理中', label: '處理中' },
  { value: '配送中', label: '配送中' },
  { value: '已送達', label: '已送達' },
  { value: '已取貨', label: '已取貨' },
];

const shippingMethods = [
  { value: '宅配', label: '宅配' },
  { value: '超商取貨', label: '超商取貨' },
  { value: '門市自取', label: '門市自取' },
];

const DeliverySearch: React.FC = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '物流編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '訂單編號',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: '收件人',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '配送方式',
      dataIndex: 'shippingMethod',
      key: 'shippingMethod',
      render: (method: string) => (
        <Space>
          {method === '宅配' ? <CarOutlined /> : <ShopOutlined />}
          <span>{method}</span>
        </Space>
      ),
    },
    {
      title: '追蹤編號',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: '目前狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = 
          status === '已送達' || status === '已取貨' ? 'green' :
          status === '配送中' ? 'blue' :
          status === '處理中' ? 'orange' :
          'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '目前位置',
      dataIndex: 'currentLocation',
      key: 'currentLocation',
      render: (location: string) => (
        <Space>
          <EnvironmentOutlined />
          <span>{location}</span>
        </Space>
      ),
    },
    {
      title: '預計送達',
      dataIndex: 'estimatedDelivery',
      key: 'estimatedDelivery',
    },
    {
      title: '實際送達',
      dataIndex: 'actualDelivery',
      key: 'actualDelivery',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Delivery) => (
        <Space size="middle">
          <Button type="link" onClick={() => showDeliveryHistory(record)}>
            查看進度
          </Button>
          <Button type="link">
            列印標籤
          </Button>
        </Space>
      ),
    },
  ];

  const showDeliveryHistory = (delivery: Delivery) => {
    // 這裡可以實現顯示物流歷史記錄的邏輯
    console.log('物流歷史記錄：', delivery.history);
  };

  const handleSearch = (values: any) => {
    console.log('搜尋條件：', values);
    // 這裡可以實現實際的搜尋邏輯
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{ marginBottom: '24px' }}>
        <Form
          form={form}
          onFinish={handleSearch}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item name="deliveryId" label="物流編號">
                <Input
                  placeholder="請輸入物流編號"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="orderId" label="訂單編號">
                <Input
                  placeholder="請輸入訂單編號"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="customerName" label="收件人">
                <Input
                  placeholder="請輸入收件人姓名"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="trackingNumber" label="追蹤編號">
                <Input
                  placeholder="請輸入追蹤編號"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="shippingMethod" label="配送方式">
                <Select
                  placeholder="請選擇配送方式"
                  options={shippingMethods}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="物流狀態">
                <Select
                  placeholder="請選擇物流狀態"
                  options={deliveryStatus}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="deliveryDate" label="配送日期">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜尋
                </Button>
                <Button onClick={() => form.resetFields()}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="物流列表">
        <Table
          columns={columns}
          dataSource={mockDeliveries}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default DeliverySearch; 