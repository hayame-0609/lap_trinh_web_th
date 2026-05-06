import React, { useState } from 'react';
import { Tabs } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined, PlusOutlined, DashboardOutlined } from '@ant-design/icons';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import TaskTable from './components/TaskTable';
import TaskFormModal from './components/TaskFormModal';
import { useTasks } from './hooks/useTasks';
import { Task } from './types';
import './style.less';

const { TabPane } = Tabs;

const TodoList: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleOpenAdd = () => {
    setEditingTask(undefined);
    setModalVisible(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleSubmit = (values: Omit<Task, 'id' | 'createdAt'>) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...values });
    } else {
      addTask(values);
    }
    setModalVisible(false);
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <div className="todo-title">
          <h1>Quản lý công việc</h1>
          <p>Theo dõi và quản lý công việc cá nhân</p>
        </div>
        <button className="btn-add-task" onClick={handleOpenAdd}>
          <PlusOutlined /> Thêm task
        </button>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="todo-tabs">
        <TabPane
          tab={<span><DashboardOutlined />Dashboard</span>}
          key="dashboard"
        >
          <Dashboard tasks={tasks} />
        </TabPane>
        <TabPane
          tab={<span><AppstoreOutlined />Kanban Board</span>}
          key="kanban"
        >
          <KanbanBoard tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} onMove={moveTask} />
        </TabPane>
        <TabPane
          tab={<span><UnorderedListOutlined />Danh sách task</span>}
          key="list"
        >
          <TaskTable tasks={tasks} onEdit={handleEdit} onDelete={deleteTask} />
        </TabPane>
      </Tabs>

      <TaskFormModal
        visible={modalVisible}
        task={editingTask}
        onSubmit={handleSubmit}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
};

export default TodoList;