import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';

export default function NhanVien() {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const handleAdd = () => {
    form.validateFields().then(values => {
      setData([...data, { ...values, id: Date.now() }]);
      setOpen(false);
      form.resetFields();
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Thêm nhân viên
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Tên', dataIndex: 'name' },
          { title: 'Số khách/ngày', dataIndex: 'maxCustomers' },
          { title: 'Giờ làm', dataIndex: 'workingHours' },
        ]}
      />

      <Modal visible={open} onCancel={() => setOpen(false)} onOk={handleAdd}>
        <Form form={form}>
          <Form.Item name="name" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="maxCustomers" label="Số khách/ngày">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="workingHours" label="Giờ làm">
            <Input placeholder="9:00-17:00" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}