import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input } from 'antd';

const KhoiKienThuc = () => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('categories');
    if (saved) setData(JSON.parse(saved));
  }, []);

  const save = (newData:any) => {
    setData(newData);
    localStorage.setItem('categories', JSON.stringify(newData));
  };

  const add = () => {
    const newItem = { id: Date.now(), name };
    const newData = [...data, newItem];
    save(newData);
    setName('');
    setOpen(false);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Tên khối', dataIndex: 'name' },
  ];

  return (
    <div>
      <Button type="primary" onClick={()=>setOpen(true)}>Thêm khối</Button>

      <Table columns={columns} dataSource={data} rowKey="id"/>

      <Modal visible={open} onOk={add} onCancel={()=>setOpen(false)}>
        <Input
          placeholder="Tên khối kiến thức"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default KhoiKienThuc;