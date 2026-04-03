import React, { useState } from 'react';
import { Table, Button, Modal, Select } from 'antd';

const ThanhVienPage = () => {
  const [data, setData] = useState([
    { id: 1, ten: 'Nam', clb: 'IT' },
    { id: 2, ten: 'Huy', clb: 'Music' },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newCLB, setNewCLB] = useState('');

  const handleChangeCLB = () => {
    setData(data.map(i =>
      selectedRowKeys.includes(i.id) ? { ...i, clb: newCLB } : i
    ));
    setOpen(false);
    setSelectedRowKeys([]);
  };

  const columns = [
    { title: 'Tên', dataIndex: 'ten' },
    { title: 'CLB', dataIndex: 'clb' },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)}>Chuyển CLB</Button>

      <Table
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={data}
      />

      <Modal visible={open} onOk={handleChangeCLB} onCancel={() => setOpen(false)}>
        <Select style={{ width: '100%' }} onChange={setNewCLB}>
          <Select.Option value="IT">IT</Select.Option>
          <Select.Option value="Music">Music</Select.Option>
        </Select>
      </Modal>
    </>
  );
};

export default ThanhVienPage;