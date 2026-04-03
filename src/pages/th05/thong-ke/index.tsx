import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'antd';
import { Column } from '@ant-design/plots';

interface DonDangKy {
  id: number;
  clb: string;
  trangThai: 'Pending' | 'Approved' | 'Rejected';
}

const ThongKePage: React.FC = () => {
  const [data, setData] = useState<DonDangKy[]>([]);
  const [tong, setTong] = useState({
    clb: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    const fakeData: DonDangKy[] = [
      { id: 1, clb: 'Bóng đá', trangThai: 'Pending' },
      { id: 2, clb: 'Bóng đá', trangThai: 'Approved' },
      { id: 3, clb: 'Âm nhạc', trangThai: 'Rejected' },
      { id: 4, clb: 'Âm nhạc', trangThai: 'Approved' },
      { id: 5, clb: 'IT', trangThai: 'Pending' },
      { id: 6, clb: 'IT', trangThai: 'Approved' },
    ];

    setData(fakeData);


    const pending = fakeData.filter(i => i.trangThai === 'Pending').length;
    const approved = fakeData.filter(i => i.trangThai === 'Approved').length;
    const rejected = fakeData.filter(i => i.trangThai === 'Rejected').length;

    const clbSet = new Set(fakeData.map(i => i.clb));

    setTong({
      clb: clbSet.size,
      pending,
      approved,
      rejected,
    });
  }, []);

  const chartData = data.map(item => ({
    clb: item.clb,
    trangThai: item.trangThai,
  }));

  const config = {
    data: chartData,
    xField: 'clb',
    yField: 'value',
    seriesField: 'trangThai',
    isGroup: true,

    statistic: {
      content: false,
    },
  };

  const processedData = Object.values(
    chartData.reduce((acc: any, cur) => {
      const key = `${cur.clb}-${cur.trangThai}`;
      if (!acc[key]) {
        acc[key] = {
          clb: cur.clb,
          trangThai: cur.trangThai,
          value: 0,
        };
      }
      acc[key].value += 1;
      return acc;
    }, {})
  );

  return (
    <div>
      <h2>Báo cáo & Thống kê</h2>

      {}
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Số CLB">{tong.clb}</Card>
        </Col>
        <Col span={6}>
          <Card title="Pending">{tong.pending}</Card>
        </Col>
        <Col span={6}>
          <Card title="Approved">{tong.approved}</Card>
        </Col>
        <Col span={6}>
          <Card title="Rejected">{tong.rejected}</Card>
        </Col>
      </Row>

      {}
      <Card title="Thống kê theo CLB" style={{ marginTop: 20 }}>
        <Column
          data={processedData}
          xField="clb"
          yField="value"
          seriesField="trangThai"
          isGroup={true}
        />
      </Card>
    </div>
  );
};

export default ThongKePage;