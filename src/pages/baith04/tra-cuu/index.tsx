import { Button, Form, Input, Table, message } from "antd";
import { useState } from "react";

export default function TraCuuPage() {
  const [data] = useState<any[]>([]); // giả lập DB
  const [result, setResult] = useState<any[]>([]);
  const [form] = Form.useForm();

  const onSearch = (values: any) => {
    const filled = Object.values(values).filter(v => v);
    if (filled.length < 2) {
      message.error("Nhập ít nhất 2 tiêu chí!");
      return;
    }

    const filtered = data.filter(item =>
      Object.keys(values).every(key =>
        !values[key] || item[key]?.toString().includes(values[key])
      )
    );

    setResult(filtered);
  };

  const columns = [
    { title: "Số hiệu", dataIndex: "soHieu" },
    { title: "MSV", dataIndex: "msv" },
    { title: "Họ tên", dataIndex: "hoTen" },
  ];

  return (
    <div>
      <h2>Tra cứu văn bằng</h2>

      <Form layout="inline" form={form} onFinish={onSearch}>
        <Form.Item name="soHieu">
          <Input placeholder="Số hiệu" />
        </Form.Item>

        <Form.Item name="msv">
          <Input placeholder="MSV" />
        </Form.Item>

        <Form.Item name="hoTen">
          <Input placeholder="Họ tên" />
        </Form.Item>

        <Button type="primary" htmlType="submit">Tra cứu</Button>
      </Form>

      <Table columns={columns} dataSource={result} rowKey="id" style={{ marginTop: 20 }} />
    </div>
  );
}