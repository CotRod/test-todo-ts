import { useEffect, useState } from 'react';
import { TodoItem } from '../interfaces/TodoItem';
import { Form } from 'antd';
import FormFields from '../enums/FormFields';

const useTodoItems = () => {
  const jsonItems = localStorage.getItem('todos');
  let itemsFromLocalStorage = [];
  if (jsonItems) {
    itemsFromLocalStorage = JSON.parse(jsonItems);
  }

  const [items, setItems] = useState<TodoItem[]>(itemsFromLocalStorage);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(items));
  }, [items]);

  const onAddItem = ({ title, text, date }: TodoItem) => {
    const currentDate = new Date();
    const newItem: TodoItem = {
      [FormFields.text]: text,
      [FormFields.title]: title,
      [FormFields.date]: currentDate.toISOString(),
    }
    setItems((prevItems => {
      if (date) {
        return [...prevItems.filter(item => item.date !== date), newItem];
      }

      return [...prevItems, newItem];
    }))
    form.resetFields();
  }

  const onDeleteItem = (isoDate: string) => {
    setItems(prevState => prevState.filter(item => item.date !== isoDate));
  }

  const onEditItem = ({ title, text, date }: TodoItem) => {
    form.setFieldsValue({ title, text, date });
  }

  return {items, form, onEditItem, onAddItem, onDeleteItem}
}

export default useTodoItems;