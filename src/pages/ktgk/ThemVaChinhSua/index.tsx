import React from "react";
import { Modal, Button } from "antd";
import { Order } from "../index";

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  editingOrder: Order | null;
  setEditingOrder: React.Dispatch<React.SetStateAction<Order | null>>;
}

const ThemVaChinhSua: React.FC<Props> = ({
  orders,
  setOrders,
  openModal,
  setOpenModal,
  editingOrder,
  setEditingOrder,
}) => {
  const handleSave = () => {
    if (editingOrder) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editingOrder.id
            ? { ...o, customer: "Đã sửa" }
            : o
        )
      );
    } else {
      setOrders((prev) => [
        ...prev,
        {
          id: `DH00${prev.length + 1}`,
          customer: "Khách mới",
          orderDate: "2026-04-15",
          total: 1000000,
          status: "Chờ xác nhận",
        },
      ]);
    }

    setEditingOrder(null);
    setOpenModal(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setEditingOrder(null);
          setOpenModal(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Thêm đơn hàng
      </Button>

      <Modal
        visible={openModal}
        title={editingOrder ? "Sửa đơn hàng" : "Thêm đơn hàng"}
        onCancel={() => setOpenModal(false)}
        onOk={handleSave}
      >
        Demo Form ở đây
      </Modal>
    </>
  );
};

export default ThemVaChinhSua;