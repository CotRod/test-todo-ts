import { TodoItem } from '../interfaces/TodoItem';
import { Form } from 'antd';
import FormFields from '../enums/FormFields';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, todosSelector } from '../store/todoSlice';

const useTodoItems = () => {
  const items = useSelector(todosSelector);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onAddItem = ({ title, text, date }: TodoItem) => {
    const newItem: Partial<TodoItem> = {
      [FormFields.text]: text,
      [FormFields.title]: title,
    }
    if (date) {
      dispatch(removeTodo(date))
    }
    dispatch(addTodo(newItem))

    form.resetFields();
  }

  const onDeleteItem = (isoDate: string) => {
    dispatch(removeTodo(isoDate));
  }

  const onEditItem = ({ title, text, date }: TodoItem) => {
    form.setFieldsValue({ title, text, date });
  }

  return { items, form, onEditItem, onAddItem, onDeleteItem }
}

export default useTodoItems;