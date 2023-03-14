import React, { useEffect, useState } from 'react';
import classes from './app.module.scss';
import { Button, Divider, Form, Input } from 'antd';

const {app, container, title} = classes;
interface FormValues {
  title: string;
  text: string;
}

interface todoItem {
  title: string;
  text: string;
  date: string;
}

function App() {
  const [items, setItems] = useState<todoItem[]>([]);
  const [form] = Form.useForm();

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const onFinish = ({ title, text }: FormValues) => {
    const date = new Date();
    const newItem: todoItem = {
      text: text,
      title: title,
      date: date.toISOString(),
    }
    setItems((prevItems => [...prevItems, newItem]))
    form.resetFields();
  }

  return (
    <div className={app}>
      <div className={container}>
        <h1 className={title}>Simple todo list</h1>
        <Form
          layout={'vertical'}
          onFinish={onFinish}
          style={{width: '100%'}}
          form={form}
        >
          <Form.Item
            label={'Title'}
            name={'title'}
            required
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label={'What should I do'}
            name={'text'}
            required
          >
            <Input.TextArea
              rows={4}
              maxLength={120}
              showCount
              allowClear/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Divider />

      </div>
    </div>
  );
}

export default App;
