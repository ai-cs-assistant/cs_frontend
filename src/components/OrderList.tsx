import { Table } from 'antd';

export const OrderList = ({ orders }: { orders: any[] }) => {
  const columns = [
    { title: '訂單編號', dataIndex: 'orderId' },
    { title: '日期', dataIndex: 'date' },
    { title: '金額', dataIndex: 'amount' },
  ];

  return <Table columns={columns} dataSource={orders} rowKey="orderId" />;
};
