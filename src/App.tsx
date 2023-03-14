import React, { useEffect, useState } from 'react';
import classes from './app.module.scss';
import { Badge, Button, Card, Divider, Form, Input, List } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { app, container, title } = classes;

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
  const jsonItems = localStorage.getItem('todos');
  let itemsFromLocalStorage = [];
  if (jsonItems) {
    itemsFromLocalStorage = JSON.parse(jsonItems);
  }

  const [items, setItems] = useState<todoItem[]>(itemsFromLocalStorage);
  const [form] = Form.useForm();

  useEffect(() => {
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
          style={{ width: '100%' }}
          form={form}
        >
          <Form.Item
            label={'Title'}
            name={'title'}
            required
          >
            <Input
              maxLength={30}
              showCount
            />
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
        <Divider/>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 5,
          }}
          style={{width: '100%'}}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <Badge.Ribbon
                text={getReadableDateFromIso(item.date)}
                style={{top: 0}}
              >
              <Card
                title={item.title}
                actions={[
                  <EditOutlined key="edit" />,
                  <DeleteOutlined key="delete" />,
                ]}
              >
                {item.text}
              </Card>
              </Badge.Ribbon>
            </List.Item>
          )
          }
        />
      </div>
    </div>
  );
}

function getReadableDateFromIso(isoDate: string) {
  const date = new Date(isoDate);
  const hours = date.getHours();
  const minutes = padWithZero(date.getMinutes());
  const seconds = padWithZero(date.getSeconds());
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`
}

function padWithZero(num: number) {
  return `${num}`.padStart(2, '0');
}

export default App;
