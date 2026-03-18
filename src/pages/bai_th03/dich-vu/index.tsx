import { Table, Button, Modal, Form, Input, InputNumber } from 'antd';
import { useState } from 'react';

export default function DichVu() {
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
        Thêm dịch vụ
      </Button>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Tên dịch vụ', dataIndex: 'name' },
          { title: 'Giá', dataIndex: 'price' },
          { title: 'Thời gian (phút)', dataIndex: 'duration' },
        ]}
      />

      <Modal visible={open} onCancel={() => setOpen(false)} onOk={handleAdd}>
        <Form form={form}>
          <Form.Item name="name" label="Tên dịch vụ">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Giá">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="duration" label="Thời gian">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}