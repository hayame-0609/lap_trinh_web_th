import { Button, DatePicker, Form, Input, Table } from "antd";
import { useState } from "react";

interface VanBang {
  id: string;
  soVaoSo: number;
  soHieu: string;
  msv: string;
  hoTen: string;
  ngaySinh: string;
}

export default function VanBangPage() {
  const [data, setData] = useState<VanBang[]>([]);
  const [counter, setCounter] = useState(1);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newItem: VanBang = {
      id: Date.now().toString(),
      soVaoSo: counter,
      soHieu: values.soHieu,
      msv: values.msv,
      hoTen: values.hoTen,
      ngaySinh: values.ngaySinh.format("YYYY-MM-DD"),
    };

    setData([...data, newItem]);
    setCounter(counter + 1);
    form.resetFields();
  };

  const columns = [
    { title: "Số vào sổ", dataIndex: "soVaoSo" },
    { title: "Số hiệu", dataIndex: "soHieu" },
    { title: "MSV", dataIndex: "msv" },
    { title: "Họ tên", dataIndex: "hoTen" },
    { title: "Ngày sinh", dataIndex: "ngaySinh" },
  ];

  return (
    <div>
      <h2>Văn bằng</h2>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item name="soHieu" rules={[{ required: true }]}>
          <Input placeholder="Số hiệu" />
        </Form.Item>

        <Form.Item name="msv">
          <Input placeholder="MSV" />
        </Form.Item>

        <Form.Item name="hoTen">
          <Input placeholder="Họ tên" />
        </Form.Item>

        <Form.Item name="ngaySinh">
          <DatePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">Thêm</Button>
      </Form>

      <Table columns={columns} dataSource={data} rowKey="id" style={{ marginTop: 20 }} />
    </div>
  );
}