import { Button, Form, FormInstance, Input } from 'antd';
import React from 'react';
import { TodoItem } from '../../interfaces/TodoItem';
import FormFields from '../../enums/FormFields';
import { MAX_TEXT_LENGTH, MAX_TITLE_LENGTH, TEXT_LABEL, TEXT_ROWS, TITLE_LABEL } from '../../constants';

interface TodoFormProps {
  form: FormInstance,
  onSubmit: (item: TodoItem) => void;
}

const TodoForm = ({ form, onSubmit }: TodoFormProps) => {
  return (
    <Form
      layout={'vertical'}
      onFinish={onSubmit}
      style={{ width: '100%' }}
      form={form}
    >
      <Form.Item
        label={TITLE_LABEL}
        name={FormFields.title}
        rules={[{ required: true }]}
      >
        <Input
          maxLength={MAX_TITLE_LENGTH}
          showCount
        />
      </Form.Item>
      <Form.Item
        label={TEXT_LABEL}
        name={FormFields.text}
        rules={[{ required: true }]}
      >
        <Input.TextArea
          rows={TEXT_ROWS}
          maxLength={MAX_TEXT_LENGTH}
          showCount
          allowClear/>
      </Form.Item>
      <Form.Item name={FormFields.date} hidden>
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default TodoForm;