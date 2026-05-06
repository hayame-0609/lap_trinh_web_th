import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, Tag, Button, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import { Task, TaskStatus } from '../types';
import dayjs from 'dayjs';

interface Props {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
};

const COLUMNS: { key: TaskStatus; label: string; color: string }[] = [
  { key: 'todo', label: 'Cần làm', color: '#faad14' },
  { key: 'doing', label: 'Đang làm', color: '#1890ff' },
  { key: 'done', label: 'Hoàn thành', color: '#52c41a' },
];

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

const KanbanBoard: React.FC<Props> = ({ tasks, onEdit, onDelete, onMove }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;
    onMove(draggableId, destination.droppableId as TaskStatus);
  };

  const today = dayjs().format('YYYY-MM-DD');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="kanban-column">
              <div className="kanban-column-header" style={{ borderColor: col.color }}>
                <span style={{ color: col.color, fontWeight: 600 }}>{col.label}</span>
                <span className="kanban-count">{colTasks.length}</span>
              </div>
              <Droppable droppableId={col.key}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-drop-zone ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {colTasks.map((task, index) => {
                      const isOverdue = task.deadline && task.status !== 'done' && task.deadline < today;
                      return (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                              className={`kanban-card ${snap.isDragging ? 'is-dragging' : ''}`}
                            >
                              <div className="kanban-card-header">
                                <span className="kanban-card-name">{task.name}</span>
                                <div className="kanban-card-actions">
                                  <Tooltip title="Chỉnh sửa">
                                    <Button size="small" type="text" icon={<EditOutlined />} onClick={() => onEdit(task)} />
                                  </Tooltip>
                                  <Tooltip title="Xóa">
                                    <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(task.id)} />
                                  </Tooltip>
                                </div>
                              </div>
                              {task.description && (
                                <p className="kanban-card-desc">{task.description}</p>
                              )}
                              <div className="kanban-card-footer">
                                <Tag color={PRIORITY_COLOR[task.priority]}>{PRIORITY_LABEL[task.priority]}</Tag>
                                {task.tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                              </div>
                              {task.deadline && (
                                <div className={`kanban-card-deadline ${isOverdue ? 'overdue' : ''}`}>
                                  <CalendarOutlined /> {task.deadline}
                                  {isOverdue && <span style={{ marginLeft: 4, color: '#ff4d4f' }}>(Quá hạn)</span>}
                                </div>
                              )}
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    {colTasks.length === 0 && (
                      <div className="kanban-empty">Kéo thả task vào đây</div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;