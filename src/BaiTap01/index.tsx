import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Popconfirm, message } from 'antd';
import {initialData} from '@/models/sanpham';

export default function QuanLySanPham() {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = (values:any) => {
    const newProduct = {
      id: Date.now(),
      name: values.name,
      price: values.price,
      quantity: values.quantity,
    };
    setData(prev => [...prev, newProduct]);
    message.success('Thêm sản phẩm thành công!');
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleDelete = (id:any) => {
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Xóa sản phẩm thành công!');
  };

  const columns = [
    {
      title: 'STT',
      render: (_:any, __:any, index:any) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value:any) => value.toLocaleString() + ' đ',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Thao tác',
      render: (_:any, record:any) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa sản phẩm này?"
          onConfirm={() => handleDelete(record.id)}
          okText="Xóa"
          cancelText="Hủy"
        >
          <Button danger>Xóa</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Quản lý sản phẩm</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input.Search
          placeholder="Tìm kiếm theo tên sản phẩm"
          allowClear
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={filteredData}
        pagination={false}
      />

      <Modal
        title="Thêm sản phẩm mới"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giá"
            name="price"
            rules={[
              { required: true, message: 'Vui lòng nhập giá' },
              { type: 'number', min: 1, message: 'Giá phải là số dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              { type: 'number', min: 1, message: 'Số lượng phải là số nguyên dương' },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
