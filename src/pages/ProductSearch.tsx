import React, { useState } from 'react';
import { Card, Input, Button, Table, Space, Row, Col, Select, InputNumber, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const mockProducts: Product[] = [
  { id: 1, name: '高級筆記型電腦', price: 35000, category: '電子產品', stock: 50 },
  { id: 2, name: '無線藍牙耳機', price: 2500, category: '電子產品', stock: 100 },
  { id: 3, name: '智慧型手機', price: 20000, category: '電子產品', stock: 30 },
  { id: 4, name: '機械鍵盤', price: 3500, category: '電腦周邊', stock: 80 },
  { id: 5, name: '電競滑鼠', price: 1800, category: '電腦周邊', stock: 120 },
];

const categories = [
  { value: '電子產品', label: '電子產品' },
  { value: '電腦周邊', label: '電腦周邊' },
  { value: '辦公用品', label: '辦公用品' },
  { value: '生活用品', label: '生活用品' },
];

const stockStatus = [
  { value: 'all', label: '全部' },
  { value: 'inStock', label: '有庫存' },
  { value: 'lowStock', label: '庫存不足' },
  { value: 'outOfStock', label: '無庫存' },
];

const ProductSearch: React.FC = () => {
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const columns = [
    {
      title: '商品編號',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商品名稱',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `NT$ ${price.toLocaleString()}`,
    },
    {
      title: '類別',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '庫存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button type="link">查看詳情</Button>
          <Button type="link">編輯</Button>
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
              <Form.Item name="name" label="商品名稱">
                <Input
                  placeholder="請輸入商品名稱"
                  prefix={<SearchOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="category" label="商品類別">
                <Select
                  placeholder="請選擇類別"
                  options={categories}
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="priceRange" label="價格範圍">
                <Input.Group compact>
                  <Form.Item name={['priceRange', 'min']} noStyle>
                    <InputNumber
                      style={{ width: '45%' }}
                      placeholder="最低價"
                      min={0}
                    />
                  </Form.Item>
                  <span style={{ width: '10%', textAlign: 'center' }}>至</span>
                  <Form.Item name={['priceRange', 'max']} noStyle>
                    <InputNumber
                      style={{ width: '45%' }}
                      placeholder="最高價"
                      min={0}
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="stockStatus" label="庫存狀態">
                <Select
                  placeholder="請選擇庫存狀態"
                  options={stockStatus}
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

      <Card title="商品列表">
        <Table
          columns={columns}
          dataSource={mockProducts}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default ProductSearch; 