import { Card, Row, Col, Select } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const data = [
  { id: 1, name: 'Đà Nẵng', type: 'Biển', price: 3000000 },
  { id: 2, name: 'Đà Lạt', type: 'Núi', price: 2500000 },
];

export default function Home() {
  const [filter, setFilter] = useState<string>();

  const list = filter ? data.filter(i => i.type === filter) : data;

  return (
    <div>
      <h1>Khám phá điểm đến</h1>

      <Select
        placeholder="Chọn loại"
        style={{ width: 200, marginBottom: 20 }}
        onChange={(value) => setFilter(value)}
        allowClear
      >
        <Option value="Biển">Biển</Option>
        <Option value="Núi">Núi</Option>
      </Select>

      <Row gutter={16}>
        {list.map(item => (
          <Col span={6} key={item.id}>
            <Card title={item.name}>
              <p>Loại: {item.type}</p>
              <p>Giá: {item.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}