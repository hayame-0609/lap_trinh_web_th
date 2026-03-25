import { Button, DatePicker, Form, Input, Table } from "antd";
import { useState } from "react";

interface Decision {
  id: string;
  soQD: string;
  ngay: string;
  trichYeu: string;
  soVanBang: string;
}

export default function QuyetDinhPage() {
  const [data, setData] = useState<Decision[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newItem: Decision = {
      id: Date.now().toString(),
      soQD: values.soQD,
      ngay: values.ngay.format("YYYY-MM-DD"),
      trichYeu: values.trichYeu,
      soVanBang: values.soVanBang,
    };
    setData([...data, newItem]);
    form.resetFields();
  };

  const columns = [
    { title: "Số QĐ", dataIndex: "soQD" },
    { title: "Ngày", dataIndex: "ngay" },
    { title: "Trích yếu", dataIndex: "trichYeu" },
    { title: "Sổ văn bằng", dataIndex: "soVanBang" },
  ];

  return (
    <div>
      <h2>Quyết định tốt nghiệp</h2>

      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item name="soQD" rules={[{ required: true }]}>
          <Input placeholder="Số QĐ" />
        </Form.Item>

        <Form.Item name="ngay" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item name="trichYeu">
          <Input placeholder="Trích yếu" />
        </Form.Item>

        <Form.Item name="soVanBang">
          <Input placeholder="Sổ văn bằng" />
        </Form.Item>

        <Button type="primary" htmlType="submit">Thêm</Button>
      </Form>

      <Table columns={columns} dataSource={data} rowKey="id" style={{ marginTop: 20 }} />
    </div>
  );
}