import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Row, Col, Select, DatePicker, Form, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface Order {
  id: string;
  customerName: string;
  orderDate: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  shippingMethod: string;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD20240301001',
    customerName: '王小明',
    orderDate: '2024-03-01',
    status: '已出貨',
    totalAmount: 15800,
    paymentMethod: '信用卡',
    shippingMethod: '宅配',
    items: 3
  },
  {
    id: 'ORD20240301002',
    customerName: '李小華',
    orderDate: '2024-03-01',
    status: '處理中',
    totalAmount: 3500,
    paymentMethod: '超商取貨付款',
    shippingMethod: '超商取貨',
    items: 1
  },
  {
    id: 'ORD20240302001',
    customerName: '張大偉',
    orderDate: '2024-03-02',
    status: '已完成',
    totalAmount: 25600,
    paymentMethod: '信用卡',
    shippingMethod: '宅配',
    items: 5
  },
  {
    id: 'ORD20240302002',
    customerName: '陳小美',
    orderDate: '2024-03-02',
    status: '已取消',
    totalAmount: 8900,
    paymentMethod: '信用卡',
    shippingMethod: '宅配',
    items: 2
  },
  {
    id: 'ORD20240303001',
    customerName: '林小芳',
    orderDate: '2024-03-03',
    status: '已出貨',
    totalAmount: 12500,
    paymentMethod: '超商取貨付款',
    shippingMethod: '超商取貨',
    items: 4
  }
];

const orderStatus = [
  { value: '處理中', label: '處理中' },
  { value: '已出貨', label: '已出貨' },
  { value: '已完成', label: '已完成' },
  { value: '已取消', label: '已取消' },
];

const paymentMethods = [
  { value: '信用卡', label: '信用卡' },
  { value: '超商取貨付款', label: '超商取貨付款' },
  { value: '銀行轉帳', label: '銀行轉帳' },
];

const shippingMethods = [
  { value: '宅配', label: '宅配' },
  { value: '超商取貨', label: '超商取貨' },
  { value: '門市自取', label: '門市自取' },
];

const OrderSearch: React.FC = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '訂單編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '客戶姓名',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: '訂單日期',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: '訂單狀態',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '訂單金額',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `NT$ ${amount.toLocaleString()}`,
    },
    {
      title: '付款方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '配送方式',
      dataIndex: 'shippingMethod',
      key: 'shippingMethod',
    },
    {
      title: '商品數量',
      dataIndex: 'items',
      key: 'items',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button type="link">查看詳情</Button>
          <Button type="link">列印訂單</Button>
        </Space>
      ),
    },
  ];

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
              <Form.Item name="orderId" label="訂單編號">
                <Input
                  placeholder="請輸入訂單編號"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="customerName" label="客戶姓名">
                <Input
                  placeholder="請輸入客戶姓名"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="orderDate" label="訂單日期">
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="訂單狀態">
                <Select
                  placeholder="請選擇訂單狀態"
                  options={orderStatus}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="paymentMethod" label="付款方式">
                <Select
                  placeholder="請選擇付款方式"
                  options={paymentMethods}
                  allowClear
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
              <Form.Item name="amountRange" label="訂單金額">
                <Input.Group compact>
                  <Form.Item name={['amountRange', 'min']} noStyle>
                    <InputNumber
                      style={{ width: '45%' }}
                      placeholder="最低金額"
                      min={0}
                    />
                  </Form.Item>
                  <span style={{ width: '10%', textAlign: 'center' }}>至</span>
                  <Form.Item name={['amountRange', 'max']} noStyle>
                    <InputNumber
                      style={{ width: '45%' }}
                      placeholder="最高金額"
                      min={0}
                    />
                  </Form.Item>
                </Input.Group>
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

      <Card title="訂單列表">
        <Table
          columns={columns}
          dataSource={mockOrders}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default OrderSearch; 