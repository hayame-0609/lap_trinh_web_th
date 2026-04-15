import React from "react";
import { Table, Button, Space, Tag } from "antd";
import { Order } from "../index";
import HuyDonHang from "../HuyDonHang";

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onEdit: (order: Order) => void;
}

const DanhSachDonHang: React.FC<Props> = ({ orders, setOrders, onEdit }) => {
  return (
    <Table
      rowKey="id"
      dataSource={orders}
      columns={[
        { title: "Mã đơn", dataIndex: "id" },
        { title: "Khách hàng", dataIndex: "customer" },
        { title: "Ngày đặt", dataIndex: "orderDate" },
        { title: "Tổng tiền", dataIndex: "total" },
        {
          title: "Trạng thái",
          dataIndex: "status",
          render: (status) => <Tag>{status}</Tag>,
        },
        {
          title: "Thao tác",
          render: (_, record) => (
            <Space>
              <Button onClick={() => onEdit(record)}>Sửa</Button>
              <HuyDonHang order={record} setOrders={setOrders} />
            </Space>
          ),
        },
      ]}
    />
  );
};

export default DanhSachDonHang;