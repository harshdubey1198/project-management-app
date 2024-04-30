// components/ProjectModal.js
import { Modal, Form, Input } from 'antd';
import { useState } from 'react';

const ProjectModal = ({ isVisible, onOk, onCancel }) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="New Project"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" rules={[{ required: true, message: 'Project name is required' }]}>
          <Input placeholder="Project Name" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectModal;
