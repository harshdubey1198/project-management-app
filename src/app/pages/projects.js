// pages/projects.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { List, Button } from 'antd';
import ProjectModal from '../components/ProjectModal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../stores/authStore';

const fetchProjects = async () => {
  return [
    { id: 1, name: 'Project A' },
    { id: 2, name: 'Project B' },
  ];
};

const Projects = () => {
  const { data, error, isLoading } = useQuery(['projects'], fetchProjects);
  const router = useRouter();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const mutation = useMutation(
    async (newProject) => {
      // Simulate adding a new project
      return { id: Math.random(), name: newProject.name };
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['projects']);
      },
    }
  );

  const handleAddProject = (project) => {
    mutation.mutate(project);
    setIsModalVisible(false);
  };

  const handleView = (id) => {
    router.push(`/projects/${id}`);
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div>
      <h1>Projects</h1>
      <Button onClick={() => setIsModalVisible(true)}>Add Project</Button>
      <ProjectModal
        isVisible={isModalVisible}
        onOk={handleAddProject}
        onCancel={() => setIsModalVisible(false)}
      />
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            {item.name}
            <Button onClick={() => handleView(item.id)}>View</Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Projects;
