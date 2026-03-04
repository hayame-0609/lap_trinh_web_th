import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Space, Modal, InputNumber, Typography, Divider } from 'antd';

const { Text } = Typography;

interface StudySession {
  id: number;
  date: string;
  duration: number;
  content: string;
}

interface Subject {
  id: number;
  name: string;
  sessions: StudySession[];
  monthlyGoal: number;
}

const StudyManager: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load từ localStorage
  useEffect(() => {
    const data = localStorage.getItem('subjects');
    if (data) {
      setSubjects(JSON.parse(data));
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (!newSubject) return;

    const newData: Subject = {
      id: Date.now(),
      name: newSubject,
      sessions: [],
      monthlyGoal: 0,
    };

    setSubjects([...subjects, newData]);
    setNewSubject('');
  };

  const deleteSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const addSession = (duration: number, content: string) => {
    if (!selectedSubject) return;

    const newSession: StudySession = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      duration,
      content,
    };

    const updatedSubjects = subjects.map((s) =>
      s.id === selectedSubject.id
        ? { ...s, sessions: [...s.sessions, newSession] }
        : s
    );

    setSubjects(updatedSubjects);
    setIsModalOpen(false);
  };

  const getTotalDuration = (subject: Subject) => {
    return subject.sessions.reduce((sum, s) => sum + s.duration, 0);
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title="Quản Lý Học Tập">
        <Space>
          <Input
            placeholder="Tên môn học"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <Button type="primary" onClick={addSubject}>
            Thêm môn
          </Button>
        </Space>

        <Divider />

        <List
          dataSource={subjects}
          renderItem={(subject) => {
            const total = getTotalDuration(subject);
            const reached = total >= subject.monthlyGoal && subject.monthlyGoal > 0;

            return (
              <Card style={{ marginBottom: 16 }}>
                <Space direction="vertical">
                  <Text strong>{subject.name}</Text>
                  <Text>Tổng giờ học: {total} giờ</Text>
                  <Text>
                    Mục tiêu tháng: {subject.monthlyGoal} giờ
                  </Text>
                  <Text type={reached ? 'success' : 'danger'}>
                    {reached ? 'Đã đạt mục tiêu 🎉' : 'Chưa đạt mục tiêu'}
                  </Text>

                  <Space>
                    <Button onClick={() => {
                      setSelectedSubject(subject);
                      setIsModalOpen(true);
                    }}>
                      Thêm buổi học
                    </Button>

                    <Button danger onClick={() => deleteSubject(subject.id)}>
                      Xóa môn
                    </Button>
                  </Space>
                </Space>
              </Card>
            );
          }}
        />
      </Card>

      <Modal
        title="Thêm Buổi Học"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <InputNumber
          placeholder="Số giờ học"
          style={{ width: '100%', marginBottom: 8 }}
          onChange={(value) => {
            (window as any).tempDuration = value;
          }}
        />

        <Input
          placeholder="Nội dung học"
          style={{ marginBottom: 8 }}
          onChange={(e) => {
            (window as any).tempContent = e.target.value;
          }}
        />

        <Button
          type="primary"
          block
          onClick={() =>
            addSession(
              (window as any).tempDuration || 0,
              (window as any).tempContent || ''
            )
          }
        >
          Lưu
        </Button>
      </Modal>
    </div>
  );
};

export default StudyManager;