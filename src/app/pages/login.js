// pages/login.js
'use client'; // Mark this component as a Client Component

import { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useRouter } from 'next/navigation'; // Use navigation instead of router
import { useAuthStore } from '../stores/authStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Form onFinish={handleLogin}>
        <Form.Item label="Username">
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
