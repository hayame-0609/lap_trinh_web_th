import { Button, Form, Input, Select, Table, Popconfirm } from "antd";
import { useState } from "react";

type FieldType = "string" | "number" | "date";

interface FieldConfig {
  key: string;
  name: string;
  type: FieldType;
}

export default function CauHinhPage() {
  const [fields, setFields] = useState<FieldConfig[]>([
    { key: "1", name: "Dân tộc", type: "string" },
    { key: "2", name: "Nơi sinh", type: "string" },
    { key: "3", name: "Điểm trung bình", type: "number" },
    { key: "4", name: "Ngày nhập học", type: "date" },
  ]);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const newField: FieldConfig = {
      key: Date.now().toString(),
      name: values.name.trim(),
      type: values.type,
    };

    setFields([...fields, newField]);
    form.resetFields();
  };

  const handleDelete = (key: string) => {
    setFields(fields.filter(f => f.key !== key));
  };

  const columns = [
    {
      title: "Tên trường",
      dataIndex: "name",
    },
    {
      title: "Kiểu dữ liệu",
      dataIndex: "type",
      render: (type: FieldType) => {
        switch (type) {
          case "string":
            return "Chuỗi";
          case "number":
            return "Số";
          case "date":
            return "Ngày";
          default:
            return type;
        }
      },
    },
    {
      title: "Hành động",
      render: (_: any, record: FieldConfig) => (
        <Popconfirm
          title="Xóa trường này?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <h2>Cấu hình biểu mẫu văn bằng</h2>

      {/* Form thêm field */}
      <Form layout="inline" form={form} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Nhập tên trường" }]}
        >
          <Input placeholder="VD: Quê quán" />
        </Form.Item>

        <Form.Item
          name="type"
          rules={[{ required: true, message: "Chọn kiểu dữ liệu" }]}
        >
          <Select placeholder="Kiểu dữ liệu" style={{ width: 150 }}>
            <Select.Option value="string">Chuỗi</Select.Option>
            <Select.Option value="number">Số</Select.Option>
            <Select.Option value="date">Ngày</Select.Option>
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Thêm trường
        </Button>
      </Form>

      {/* Bảng cấu hình */}
      <Table
        columns={columns}
        dataSource={fields}
        rowKey="key"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}