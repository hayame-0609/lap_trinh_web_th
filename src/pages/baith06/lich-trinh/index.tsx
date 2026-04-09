import { Input, Button, List } from 'antd';
import { useState } from 'react';

export default function LichTrinh() {
  const [list, setList] = useState<string[]>([]);
  const [value, setValue] = useState('');

  const add = () => {
    if (!value) return;
    setList([...list, value]);
    setValue('');
  };

  return (
    <div>
      <h1>Lịch trình</h1>

      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ width: 300 }}
      />

      <Button type="primary" onClick={add} style={{ marginLeft: 10 }}>
        Thêm
      </Button>

      <List
        dataSource={list}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}