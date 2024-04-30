// components/TaskFilters.js
import { Input, Select } from 'antd';

const TaskFilters = ({ onSearch, onFilter }) => {
  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const handleStatusChange = (value) => {
    onFilter(value);
  };

  return (
    <div>
      <Input placeholder="Search tasks..." onChange={handleSearchChange} />
      <Select
        defaultValue="All"
        onChange={handleStatusChange}
        options={[
          { value: 'All', label: 'All' },
          { value: 'To Do', label: 'To Do' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Done', label: 'Done' },
        ]}
      />
    </div>
  );
};

export default TaskFilters;
