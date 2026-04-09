import { Table, Button } from 'antd';

const data = [
  { id: 1, name: 'Đà Nẵng', location: 'VN', price: 3000000 },
  { id: 2, name: 'Đà Lạt', location: 'VN', price: 2500000 },
];

export default function DiemDen() {
  return (
    <div>
      <h1>Quản lý điểm đến</h1>

      <Button type="primary" style={{ marginBottom: 10 }}>
        Thêm mới
      </Button>

      <Table
        dataSource={data}
        rowKey="id"
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Địa điểm', dataIndex: 'location' },
          { title: 'Giá', dataIndex: 'price' },
        ]}
      />
    </div>
  );
}