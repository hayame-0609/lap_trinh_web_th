import React, { useState } from "react";
import DanhSachDonHang from "./DanhSachDonHang";
import ThemVaChinhSua from "./ThemVaChinhSua";

export type OrderStatus = "Chờ xác nhận" | "Đang giao" | "Hoàn thành" | "Hủy";

export interface Order {
  id: string;
  customer: string;
  orderDate: string;
  total: number;
  status: OrderStatus;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: "DH001",
    customer: "Nguyễn Văn An",
    orderDate: "2024-01-15",
    total: 28600000,
    status: "Hoàn thành",
  },
  {
    id: "DH002",
    customer: "Trần Thị Bích",
    orderDate: "2024-01-18",
    total: 16000000,
    status: "Chờ xác nhận",
  },
];

const KTGKPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [openModal, setOpenModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);

  return (
    <>
      <ThemVaChinhSua
        orders={orders}
        setOrders={setOrders}
        openModal={openModal}
        setOpenModal={setOpenModal}
        editingOrder={editingOrder}
        setEditingOrder={setEditingOrder}
      />

      <DanhSachDonHang
        orders={orders}
        setOrders={setOrders}
        onEdit={(order) => {
          setEditingOrder(order);
          setOpenModal(true);
        }}
      />
    </>
  );
};

export default KTGKPage;