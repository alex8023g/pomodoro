import { Divider, InputBase, ListItem, Paper } from '@mui/material';
import produce from 'immer';
import React, { useEffect, useRef, useState } from 'react';
import { ITask } from '../TaskBlock';
import useTaskStore from '../../store';
import { TaskMenu } from '../TaskMenu';
import styles from './task.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { style } from './style';

export interface ITaskProps1 {
  task: ITask;
  index: number;
}

export function Task({ task, index }: ITaskProps1) {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(task.taskText);
  const inputElement = useRef<HTMLElement | null>(null);
  const editTaskTextStore = useTaskStore((state) => state.editTaskText);

  useEffect(() => {
    if (isEdit && inputElement.current) {
      inputElement.current.focus();
    }
  }, [isEdit]);

  function saveEditedTask(e: React.FormEvent<HTMLFormElement>, taskId: string) {
    e.preventDefault();
    editTaskTextStore(task, editedTaskText);
    setIsEdit(false);
  }

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <ListItem
          // sx={{ display: 'flex', alignItems: 'center' }}
          disablePadding
          // key={task.id}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper
            id='myform'
            component='form'
            elevation={3}
            sx={style.paper}
            onSubmit={(e) => saveEditedTask(e, task.id)}
          >
            <div className={styles.circle}>{task.pomodoroTotal}</div>

            <InputBase
              sx={style.inputbase}
              inputProps={{ 'aria-label': 'input task' }}
              value={editedTaskText}
              disabled={!isEdit}
              inputRef={inputElement}
              onChange={(e) => {
                setEditedTaskText(e.target.value);
              }}
            />
            <Divider sx={style.divider} orientation='vertical' />
            <TaskMenu task={task} isEdit2={isEdit} setIsEdit={setIsEdit} />
          </Paper>
        </ListItem>
      )}
    </Draggable>
  );
}
