import { Form, Input, DatePicker, TimePicker, Select, Button, message, Table } from 'antd';
import { useState } from 'react';

export default function LichHen() {
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const date = values.date.format('YYYY-MM-DD');
    const time = values.time.format('HH:mm');

    const conflict = data.some(
      (a) => a.employeeId === values.employeeId && a.date === date && a.time === time
    );

    if (conflict) {
      message.error('Trùng lịch rồi ');
      return;
    }

    setData([...data, { ...values, date, time, id: Date.now(), status: 'pending' }]);
    message.success('Đặt lịch thành công ');
    form.resetFields();
  };

  return (
    <>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="customerName" label="Tên khách" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="employeeId" label="Nhân viên">
          <Select options={[{ label: 'NV1', value: 1 }]} />
        </Form.Item>

        <Form.Item name="date">
          <DatePicker />
        </Form.Item>

        <Form.Item name="time">
          <TimePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Đặt lịch
        </Button>
      </Form>

      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: 'Khách', dataIndex: 'customerName' },
          { title: 'Ngày', dataIndex: 'date' },
          { title: 'Giờ', dataIndex: 'time' },
          { title: 'Trạng thái', dataIndex: 'status' },
        ]}
      />
    </>
  );
}