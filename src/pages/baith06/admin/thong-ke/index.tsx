import React from 'react';
import { Column } from '@ant-design/plots';

const ThongKe: React.FC = () => {
  const data = [
    { type: 'Đà Nẵng', value: 3000000 },
    { type: 'Đà Lạt', value: 2500000 },
    { type: 'Nha Trang', value: 2800000 },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'value',
    height: 400,
    label: {
      position: 'middle' as const,
    },
    meta: {
      type: { alias: 'Điểm đến' },
      value: { alias: 'Chi phí' },
    },
  };

  return (
    <div>
      <h1>Thống kê chi phí du lịch</h1>
      <Column {...config} />
    </div>
  );
};

export default ThongKe;