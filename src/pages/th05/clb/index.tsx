import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Switch } from 'antd';

interface CLB {
  id: number;
  ten: string;
  ngayThanhLap: string;
  chuNhiem: string;
  hoatDong: boolean;
}

const CLBPage = () => {
  const [data, setData] = useState<CLB[]>([
    { id: 1, ten: 'IT', ngayThanhLap: '2020', chuNhiem: 'An', hoatDong: true },
  ]);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form] = Form.useForm();

  const openModal = (record?: any) => {
    setEditing(record);
    setOpen(true);
    if (record) form.setFieldsValue(record);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editing) {
        setData(data.map(i => i.id === editing.id ? { ...i, ...values } : i));
      } else {
        setData([...data, { ...values, id: Date.now() }]);
      }
      setOpen(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: 'Tên CLB', dataIndex: 'ten' },
    { title: 'Ngày TL', dataIndex: 'ngayThanhLap' },
    { title: 'Chủ nhiệm', dataIndex: 'chuNhiem' },
    {
      title: 'Hoạt động',
      dataIndex: 'hoatDong',
      render: (v: boolean) => v ? 'Có' : 'Không'
    },
    {
      title: 'Action',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => openModal(record)}>Sửa</Button>
          <Button danger onClick={() => setData(data.filter(i => i.id !== record.id))}>
            Xóa
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <Button type="primary" onClick={() => openModal()}>Thêm CLB</Button>

      <Table rowKey="id" columns={columns} dataSource={data} />

      <Modal visible={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <Form form={form}>
          <Form.Item name="ten" label="Tên CLB" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="ngayThanhLap" label="Ngày TL">
            <Input />
          </Form.Item>

          <Form.Item name="chuNhiem" label="Chủ nhiệm">
            <Input />
          </Form.Item>

          <Form.Item name="hoatDong" label="Hoạt động" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CLBPage;