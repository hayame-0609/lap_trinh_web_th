import React, { useState } from 'react';
import { Table, Tag, Button, Input, Select, Space, Popconfirm, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Task, TaskStatus } from '../types';
import dayjs from 'dayjs';

const { Option } = Select;

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
};

const PRIORITY_COLOR: Record<string, string> = {
  high: 'red',
  medium: 'orange',
  low: 'green',
};

const PRIORITY_LABEL: Record<string, string> = {
  high: 'Cao',
  medium: 'Trung bình',
  low: 'Thấp',
};

const STATUS_COLOR: Record<string, string> = {
  todo: 'gold',
  doing: 'blue',
  done: 'green',
};

const STATUS_LABEL: Record<string, string> = {
  todo: 'Cần làm',
  doing: 'Đang làm',
  done: 'Hoàn thành',
};

const TaskTable: React.FC<Props> = ({ tasks, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');

  const today = dayjs().format('YYYY-MM-DD');

  const filtered = tasks
    .filter(t => statusFilter === 'all' || t.status === statusFilter)
    .filter(t => !search || t.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      title: 'Tên task',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (text: string) => text || '—',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: TaskStatus) => (
        <Tag color={STATUS_COLOR[status]}>{STATUS_LABEL[status]}</Tag>
      ),
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={PRIORITY_COLOR[priority]}>{PRIORITY_LABEL[priority]}</Tag>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      sorter: (a: Task, b: Task) => {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      },
      render: (deadline: string, record: Task) => {
        if (!deadline) return '—';
        const isOverdue = record.status !== 'done' && deadline < today;
        return (
          <span style={{ color: isOverdue ? '#ff4d4f' : undefined }}>
            {deadline} {isOverdue && '⚠️'}
          </span>
        );
      },
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) =>
        tags?.length ? tags.map(tag => <Tag key={tag}>{tag}</Tag>) : '—',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: unknown, record: Task) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
          </Tooltip>
          <Popconfirm
            title="Bạn có chắc muốn xóa task này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title="Xóa">
              <Button icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="task-table-wrapper">
      <div className="task-table-filters">
        <Input
          placeholder="Tìm kiếm theo tên..."
          prefix={<SearchOutlined />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
        <Select
          value={statusFilter}
          onChange={val => setStatusFilter(val)}
          style={{ width: 160 }}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="todo">Cần làm</Option>
          <Option value="doing">Đang làm</Option>
          <Option value="done">Hoàn thành</Option>
        </Select>
      </div>

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        locale={{ emptyText: 'Không có task nào' }}
      />
    </div>
  );
};

export default TaskTable;