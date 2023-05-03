import React, { useState } from 'react';
import styles from './timerblock.module.css';
import { style } from './style';
import { Box, Card, CardContent, CardHeader } from '@mui/material';
import { Timer } from '../Timer';
import useTaskStore from '../store';

export type TTimerState = 'stop' | 'work' | 'break';

export function TimerBlock() {
  const tasksStore = useTaskStore((state) => state.tasks);
  const [timerState, setTimerState] = useState<TTimerState>('stop');

  return (
    <Box display='flex' justifyContent='center'>
      <Card elevation={3} sx={style.card}>
        <CardHeader
          sx={style.cardheader}
          className={styles[timerState]}
          title={tasksStore[0]?.taskText ? tasksStore[0].taskText : 'Добавьте задачу'}
          subheader={tasksStore[0] ? `Помидор ${tasksStore[0]?.pomodoroDone + 1}` : ''}
          content={{ display: 'flex', justifyContent: 'space-between' }}
          titleTypographyProps={{
            fontSize: 16,
            display: 'inline',
            color: '#fff',
          }}
          subheaderTypographyProps={{
            fontSize: 16,
            display: 'inline',
            color: '#fff',
          }}
        />
        {/* <div className='timer-header'>Сверстать сайт Помидор1</div> */}
        <CardContent sx={style.cardcontent}>
          <Timer timerState={timerState} setTimerState={setTimerState} />
        </CardContent>
      </Card>
    </Box>
  );
}
