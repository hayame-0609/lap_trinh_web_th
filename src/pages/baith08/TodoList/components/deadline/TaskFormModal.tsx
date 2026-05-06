import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, } from 'antd';
import { Task, TaskStatus, TaskPriority } from '../types';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface Props {
  visible: boolean;
  task?: Task;
  onSubmit: (values: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
};

const TaskFormModal: React.FC<Props> = ({ visible, task, onSubmit, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (task) {
        form.setFieldsValue({
          ...task,
          deadline: task.deadline ? dayjs(task.deadline) : undefined,
          tags: task.tags || [],
        });
      } else {
        form.resetFields();
        form.setFieldsValue({ status: 'todo', priority: 'medium' });
      }
    }
  }, [visible, task]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSubmit({
      ...values,
      deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : undefined,
      tags: values.tags || [],
    });
  };

  return (
    <Modal
      title={task ? 'Chỉnh sửa task' : 'Thêm task mới'}
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={task ? 'Cập nhật' : 'Thêm'}
      cancelText="Hủy"
      width={520}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Tên task"
          rules={[{ required: true, message: 'Vui lòng nhập tên task' }]}
        >
          <Input placeholder="Nhập tên task..." />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <TextArea rows={3} placeholder="Mô tả chi tiết..." />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
          <Select>
            <Option value="todo">Cần làm</Option>
            <Option value="doing">Đang làm</Option>
            <Option value="done">Hoàn thành</Option>
          </Select>
        </Form.Item>

        <Form.Item name="priority" label="Mức độ ưu tiên" rules={[{ required: true }]}>
          <Select>
            <Option value="high">Cao</Option>
            <Option value="medium">Trung bình</Option>
            <Option value="low">Thấp</Option>
          </Select>
        </Form.Item>

        <Form.Item name="deadline" label="Deadline">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select mode="tags" placeholder="Nhập tag rồi nhấn Enter..." tokenSeparators={[',']} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;