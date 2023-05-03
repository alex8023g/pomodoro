import React, { useState } from 'react';
import { style } from './style';
import { Box, Divider, IconButton, InputBase, List, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Task } from '../Task';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import useTaskStore from '../store';
import { nanoid } from 'nanoid';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

export interface ITask {
  taskText: string;
  id: string;
  pomodoroTotal: number;
  pomodoroDone: number;
}

export function TaskBlock() {
  const [newTask, setNewTask] = useState<ITask>({
    taskText: '',
    id: '',
    pomodoroTotal: 1,
    pomodoroDone: 0,
  });

  const addTaskStore = useTaskStore((state) => state.addTask);
  const updateTasks = useTaskStore((state) => state.updateTasks);
  const tasksStore = useTaskStore((state) => state.tasks);

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTask.taskText.trim() === '') return;
    setNewTask({ ...newTask, taskText: '', id: '', pomodoroTotal: 1 });
    addTaskStore({ ...newTask, id: nanoid() });
  }

  function onDragEnd(result: any) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.draggableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = Array.from(tasksStore);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    updateTasks(items);
  }
  return (
    <>
      {/* <p>Список задач </p> */}
      <Box display='flex' justifyContent='center'>
        <Paper
          component='form'
          elevation={3}
          sx={style.paper}
          onSubmit={(e) => addTask(e)}
        >
          <InputBase
            id='input-task'
            sx={style.inputbase}
            placeholder='Название задачи'
            inputProps={{ 'aria-label': 'input task' }}
            value={newTask.taskText}
            onChange={(e) => {
              setNewTask((task) => ({ ...task, taskText: e.target.value }));
            }}
          />
          <Divider sx={style.divider} orientation='vertical' />
          <IconButton
            color='primary'
            sx={style.iconbutton}
            aria-label='directions'
            type='submit'
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box display='flex' justifyContent='center'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='droppableId'>
            {(provided) => (
              // @ts-ignore
              <List sx={style.list} ref={provided.innerRef} {...provided.droppableProps}>
                <TransitionGroup>
                  {tasksStore.map((task: ITask, index: number) => (
                    <Collapse key={task.id}>
                      <Task task={task} key={task.id} index={index} />
                    </Collapse>
                  ))}
                  {provided.placeholder}
                </TransitionGroup>
              </List>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
}
