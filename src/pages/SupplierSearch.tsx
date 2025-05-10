import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Row, Col, Select, Form, Tag } from 'antd';
import { SearchOutlined, PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  category: string[];
  status: string;
  rating: number;
  lastOrderDate: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: '台灣電子科技股份有限公司',
    contactPerson: '張志明',
    phone: '02-2345-6789',
    email: 'contact@taiwan-tech.com',
    website: 'www.taiwan-tech.com',
    address: '台北市信義區信義路五段7號',
    category: ['電子零件', '電腦周邊'],
    status: '活躍',
    rating: 4.5,
    lastOrderDate: '2024-03-01'
  },
  {
    id: 'SUP002',
    name: '永興機械工業有限公司',
    contactPerson: '李大同',
    phone: '02-3456-7890',
    email: 'sales@yongxing.com',
    website: 'www.yongxing.com',
    address: '新北市中和區中正路123號',
    category: ['機械零件', '工業設備'],
    status: '活躍',
    rating: 4.2,
    lastOrderDate: '2024-02-28'
  },
  {
    id: 'SUP003',
    name: '大華塑膠製品廠',
    contactPerson: '王美玲',
    phone: '03-4567-8901',
    email: 'info@dahua-plastic.com',
    website: 'www.dahua-plastic.com',
    address: '桃園市大園區工業路45號',
    category: ['塑膠製品', '包裝材料'],
    status: '活躍',
    rating: 4.0,
    lastOrderDate: '2024-02-25'
  },
  {
    id: 'SUP004',
    name: '明輝光電科技',
    contactPerson: '陳建宏',
    phone: '04-5678-9012',
    email: 'sales@minghui-led.com',
    website: 'www.minghui-led.com',
    address: '台中市西屯區工業區一路10號',
    category: ['LED照明', '光電元件'],
    status: '待審核',
    rating: 0,
    lastOrderDate: '-'
  },
  {
    id: 'SUP005',
    name: '永康食品原料有限公司',
    contactPerson: '林淑芬',
    phone: '06-7890-1234',
    email: 'contact@yongkang-food.com',
    website: 'www.yongkang-food.com',
    address: '台南市永康區永康工業區88號',
    category: ['食品原料', '調味料'],
    status: '活躍',
    rating: 4.8,
    lastOrderDate: '2024-03-02'
  }
];

const supplierCategories = [
  { value: '電子零件', label: '電子零件' },
  { value: '電腦周邊', label: '電腦周邊' },
  { value: '機械零件', label: '機械零件' },
  { value: '工業設備', label: '工業設備' },
  { value: '塑膠製品', label: '塑膠製品' },
  { value: '包裝材料', label: '包裝材料' },
  { value: 'LED照明', label: 'LED照明' },
  { value: '光電元件', label: '光電元件' },
  { value: '食品原料', label: '食品原料' },
  { value: '調味料', label: '調味料' },
];

const supplierStatus = [
  { value: '活躍', label: '活躍' },
  { value: '待審核', label: '待審核' },
  { value: '停用', label: '停用' },
];

const SupplierSearch: React.FC = () => {
  const [form] = Form.useForm();

  const columns = [
    {
      title: '供應商編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '供應商名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '聯絡人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
    },
    {
      title: '聯絡方式',
      key: 'contact',
      render: (record: Supplier) => (
        <Space direction="vertical" size="small">
          <Space>
            <PhoneOutlined />
            <span>{record.phone}</span>
          </Space>
          <Space>
            <MailOutlined />
            <span>{record.email}</span>
          </Space>
          <Space>
            <GlobalOutlined />
            <span>{record.website}</span>
          </Space>
        </Space>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      title: '供應類別',
      dataIndex: 'category',
      key: 'category',
      render: (categories: string[]) => (
        <Space size={[0, 8]} wrap>
          {categories.map(category => (
            <Tag key={category} color="blue">{category}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === '活躍' ? 'green' : status === '待審核' ? 'orange' : 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: '評分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => rating > 0 ? `${rating.toFixed(1)}/5.0` : '-',
    },
    {
      title: '最近訂購日期',
      dataIndex: 'lastOrderDate',
      key: 'lastOrderDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Supplier) => (
        <Space size="middle">
          <Button type="link">查看詳情</Button>
          <Button type="link">編輯資料</Button>
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
              <Form.Item name="supplierId" label="供應商編號">
                <Input
                  placeholder="請輸入供應商編號"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="name" label="供應商名稱">
                <Input
                  placeholder="請輸入供應商名稱"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="contactPerson" label="聯絡人">
                <Input
                  placeholder="請輸入聯絡人姓名"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="phone" label="聯絡電話">
                <Input
                  placeholder="請輸入聯絡電話"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="供應類別">
                <Select
                  placeholder="請選擇供應類別"
                  options={supplierCategories}
                  allowClear
                  mode="multiple"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="status" label="供應商狀態">
                <Select
                  placeholder="請選擇供應商狀態"
                  options={supplierStatus}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="rating" label="最低評分">
                <Select
                  placeholder="請選擇最低評分"
                  options={[
                    { value: 4, label: '4.0分以上' },
                    { value: 3, label: '3.0分以上' },
                    { value: 2, label: '2.0分以上' },
                    { value: 1, label: '1.0分以上' },
                  ]}
                  allowClear
                />
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

      <Card title="供應商列表">
        <Table
          columns={columns}
          dataSource={mockSuppliers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default SupplierSearch; 