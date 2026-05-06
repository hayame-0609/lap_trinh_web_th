import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Task } from '../types';
import dayjs from 'dayjs';

interface Props {
  tasks: Task[];
};

const Dashboard: React.FC<Props> = ({ tasks }) => {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const today = dayjs().format('YYYY-MM-DD');
  const overdue = tasks.filter(t => t.deadline && t.status !== 'done' && t.deadline < today).length;
  const doing = tasks.filter(t => t.status === 'doing').length;

  return (
    <div className="dashboard-wrapper">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card stat-total">
            <Statistic
              title="Tổng số task"
              value={total}
              prefix={<UnorderedListOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card stat-done">
            <Statistic
              title="Đã hoàn thành"
              value={done}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card stat-doing">
            <Statistic
              title="Đang làm"
              value={doing}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="stat-card stat-overdue">
            <Statistic
              title="Quá hạn"
              value={overdue}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {total === 0 && (
        <div className="empty-dashboard">
          <p>Chưa có task nào. Hãy thêm task đầu tiên của bạn!</p>
        </div>
      )}

      {total > 0 && (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col span={24}>
            <Card title="Tiến độ hoàn thành" className="progress-card">
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
                />
              </div>
              <p style={{ marginTop: 8, color: '#666' }}>
                {total > 0 ? Math.round((done / total) * 100) : 0}% hoàn thành ({done}/{total} task)
              </p>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Dashboard;