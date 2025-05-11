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
  {
    id: 'P001',
    name: 'Delonghi ECAM 370.95.T 全自動義式咖啡機',
    category: '咖啡機',
    price: 45800,
    stock: 15,
    supplier: '德隆電器',
    status: 'active',
    description: '全自動義式咖啡機，具備研磨、萃取、奶泡一體化功能，可製作多種咖啡飲品。',
    specifications: {
      power: '1450W',
      capacity: '1.8L',
      dimensions: '238 x 430 x 355mm',
      weight: '9.5kg'
    }
  },
  {
    id: 'P002',
    name: 'Breville BES920XL 半自動義式咖啡機',
    category: '咖啡機',
    price: 32800,
    stock: 8,
    supplier: '百靈家電',
    status: 'active',
    description: '專業級半自動義式咖啡機，具備PID溫度控制系統，可精準控制萃取溫度。',
    specifications: {
      power: '1600W',
      capacity: '2L',
      dimensions: '310 x 400 x 410mm',
      weight: '18kg'
    }
  },
  /*
  {
    id: 'P003',
    name: 'Hario V60 陶瓷濾杯',
    category: '手沖器具',
    price: 680,
    stock: 50,
    supplier: '哈里歐咖啡',
    status: 'active',
    description: '日本知名品牌手沖濾杯，採用優質陶瓷材質，可完美展現咖啡風味。',
    specifications: {
      material: '陶瓷',
      size: '02號',
      color: '白色',
      weight: '300g'
    }
  },
  */
  {
    id: 'P004',
    name: 'Motta 專業奶泡杯',
    category: '配件',
    price: 1200,
    stock: 30,
    supplier: '摩塔咖啡',
    status: 'active',
    description: '義大利進口專業奶泡杯，不鏽鋼材質，可製作完美奶泡。',
    specifications: {
      material: '不鏽鋼',
      capacity: '350ml',
      diameter: '8cm',
      height: '12cm'
    }
  },
  {
    id: 'P005',
    name: '衣索比亞 耶加雪菲 日曬 咖啡豆',
    category: '咖啡豆',
    price: 580,
    stock: 100,
    supplier: '非洲咖啡',
    status: 'active',
    description: '衣索比亞耶加雪菲產區日曬處理咖啡豆，具有柑橘、花香等風味。',
    specifications: {
      origin: '衣索比亞',
      process: '日曬',
      roast: '中淺焙',
      weight: '250g'
    }
  },
  {
    id: 'P006',
    name: 'Baratza Encore 咖啡磨豆機',
    category: '磨豆機',
    price: 6800,
    stock: 12,
    supplier: '百瑞茲',
    status: 'active',
    description: '專業級錐形刀盤磨豆機，40段研磨度可調，適合手沖和義式咖啡。',
    specifications: {
      power: '110W',
      capacity: '250g',
      dimensions: '165 x 165 x 350mm',
      weight: '4.5kg'
    }
  },
  /*
  {
    id: 'P007',
    name: 'Kalita Wave 185 不鏽鋼濾杯',
    category: '手沖器具',
    price: 850,
    stock: 25,
    supplier: '哈里歐咖啡',
    status: 'active',
    description: '日本知名品牌波浪型濾杯，三孔設計，可穩定萃取咖啡。',
    specifications: {
      material: '不鏽鋼',
      size: '185',
      color: '銀色',
      weight: '200g'
    }
  },
  {
    id: 'P008',
    name: '哥倫比亞 聖塔羅莎 水洗 咖啡豆',
    category: '咖啡豆',
    price: 520,
    stock: 80,
    supplier: '南美咖啡',
    status: 'active',
    description: '哥倫比亞聖塔羅莎產區水洗處理咖啡豆，具有堅果、巧克力等風味。',
    specifications: {
      origin: '哥倫比亞',
      process: '水洗',
      roast: '中焙',
      weight: '250g'
    }
  } 
    */
];

const categories = [
  { value: '咖啡機', label: '咖啡機' },
  { value: '手沖器具', label: '手沖器具' },
  { value: '磨豆機', label: '磨豆機' },
  { value: '咖啡豆', label: '咖啡豆' },
  { value: '配件', label: '配件' },
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
                  <span style={{ width: '10%', textAlign: 'center', padding: '0 1px 0 6px' }}>至</span>
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