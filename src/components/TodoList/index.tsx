import { Badge, Card, List } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
import { TodoItem } from '../../interfaces/TodoItem';
import getReadableDateFromIso from '../../utils/getReadableDateFromIso';

interface TodoListProps {
  items: TodoItem[],
  onEditItem: (item: TodoItem) => void;
  onDeleteItem: (isoString: string) => void;
}

const TodoList = ({ items, onEditItem, onDeleteItem }: TodoListProps) => {
  return (
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
      style={{ width: '100%' }}
      dataSource={items}
      rowKey={(item) => item.date}
      renderItem={(item) => (
        <List.Item>
          <Badge.Ribbon
            text={getReadableDateFromIso(item.date)}
            style={{ top: 0 }}
          >
            <Card
              title={item.title}
              actions={[
                <EditOutlined key="edit" onClick={() => onEditItem(item)}/>,
                <DeleteOutlined key="delete" onClick={() => onDeleteItem(item.date)
                }/>,
              ]}
            >
              {item.text}
            </Card>
          </Badge.Ribbon>
        </List.Item>
      )
      }
    />
  );
}

export default TodoList;