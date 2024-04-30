// pages/projects/[id].js
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { List, Button } from 'antd';
import { useAuthStore } from '../../stores/authStore';

const fetchProjectDetails = async (id) => {
  // Simulated API response
  return {
    id,
    name: `Project ${id}`,
    tasks: [
      { id: 1, name: 'Task 1', status: 'To Do' },
      { id: 2, name: 'Task 2', status: 'In Progress' },
    ],
    team: [
      { id: 1, name: 'Member 1' },
      { id: 2, name: 'Member 2' },
    ],
  };
};

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthStore();
  const { data, error, isLoading } = useQuery(['project', id], () => fetchProjectDetails(id));

  if (!user) {
    router.push('/login');
    return null;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching project details</p>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>Tasks</h2>
      <List
        dataSource={data.tasks}
        renderItem={(task) => (
          <List.Item>
            {task.name} - {task.status}
          </List.Item>
        )}
      />
      <h2>Team</h2>
      <List
        dataSource={data.team}
        renderItem={(member) => (
          <List.Item>
            {member.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProjectDetails;
