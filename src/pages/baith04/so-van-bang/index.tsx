import { Button, Form, Input, Table } from "antd";
import { useState } from "react";

interface SoVanBang {
  id: string;
  nam: number;
  soHienTai: number;
}

export default function SoVanBangPage() {
  const [data, setData] = useState<SoVanBang[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newItem: SoVanBang = {
      id: Date.now().toString(),
      nam: values.nam,
      soHienTai: 1,
    };
    setData([...data, newItem]);
    form.resetFields();
  };

  const columns = [
    { title: "Năm", dataIndex: "nam" },
    { title: "Số hiện tại", dataIndex: "soHienTai" },
  ];

  return (
    <div>
      <h2>Sổ văn bằng</h2>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item name="nam" rules={[{ required: true }]}>
          <Input placeholder="Năm" />
        </Form.Item>

        <Button type="primary" htmlType="submit">Tạo sổ</Button>
      </Form>

      <Table columns={columns} dataSource={data} rowKey="id" style={{ marginTop: 20 }} />
    </div>
  );
}