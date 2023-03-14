import React from 'react';
import classes from './app.module.scss';
import { Divider } from 'antd';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodoItems from './hooks/useTodoItems';
import { MAIN_APP_TITLE } from './constants';

const { app, container, title } = classes;

function App() {
  const {items, form, onAddItem, onEditItem, onDeleteItem} = useTodoItems();

  return (
    <div className={app}>
      <div className={container}>
        <h1 className={title}>{MAIN_APP_TITLE}</h1>
        <TodoForm form={form} onSubmit={onAddItem} />
        <Divider/>
        <TodoList items={items} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
      </div>
    </div>
  );
}

export default App;
