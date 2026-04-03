import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';

interface Don {
  id: number;
  ten: string;
  clb: string;
  trangThai: string;
}

const DonPage = () => {
  const [data, setData] = useState<Don[]>([
    { id: 1, ten: 'Nam', clb: 'IT', trangThai: 'Pending' },
    { id: 2, ten: 'Huy', clb: 'Music', trangThai: 'Pending' },
  ]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
  const [openReject, setOpenReject] = useState(false);
  const [lyDo, setLyDo] = useState('');

  const handleApprove = () => {
    setData(data.map(i =>
      selectedRowKeys.includes(i.id) ? { ...i, trangThai: 'Approved' } : i
    ));
    setSelectedRowKeys([]);
  };

  const handleReject = () => {
    setOpenReject(true);
  };

  const confirmReject = () => {
    setData(data.map(i =>
      selectedRowKeys.includes(i.id)
        ? { ...i, trangThai: 'Rejected', lyDo }
        : i
    ));
    setOpenReject(false);
    setSelectedRowKeys([]);
    setLyDo('');
  };

  const columns = [
    { title: 'Tên', dataIndex: 'ten' },
    { title: 'CLB', dataIndex: 'clb' },
    { title: 'Trạng thái', dataIndex: 'trangThai' },
  ];

  return (
    <>
      <Button onClick={handleApprove} type="primary">
        Duyệt
      </Button>
      <Button danger onClick={handleReject}>
        Từ chối
      </Button>

      <Table
        rowKey="id"
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={data}
      />

      <Modal visible={openReject} onOk={confirmReject} onCancel={() => setOpenReject(false)}>
        <Input
          placeholder="Nhập lý do từ chối"
          value={lyDo}
          onChange={(e) => setLyDo(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default DonPage;