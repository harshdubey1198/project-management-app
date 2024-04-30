// components/TaskList.js
import { List, Button } from 'antd';
import { useDrop, useDrag } from 'react-dnd';
import { useState } from 'react';

const TaskItem = ({ task, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <List.Item ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {task.name}
      <Button onClick={() => onDrop(task.id)}>Complete</Button>
    </List.Item>
  );
};

const TaskList = ({ tasks, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ background: isOver ? 'lightgray' : 'white' }}>
      <List
        dataSource={tasks}
        renderItem={(task) => <TaskItem task={task} onDrop={onDrop} />}
      />
    </div>
  );
};

export default TaskList;
