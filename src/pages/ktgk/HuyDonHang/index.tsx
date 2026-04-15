import React from "react";
import { Button, Popconfirm } from "antd";
import { Order } from "../index";

interface Props {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

const HuyDonHang: React.FC<Props> = ({ order, setOrders }) => {
  if (order.status !== "Chờ xác nhận") return null;

  return (
    <Popconfirm
      title="Xác nhận hủy đơn?"
      onConfirm={() =>
        setOrders((prev) =>
          prev.map((o) =>
            o.id === order.id ? { ...o, status: "Hủy" } : o
          )
        )
      }
    >
      <Button danger>Hủy</Button>
    </Popconfirm>
  );
};

export default HuyDonHang;