import React from 'react';
import { TaskBlock } from '../../components/TaskBlock';
import { TimerBlock } from '../../components/TimerBlock';
// import styles from './timerpage.css';

export function TimerPage() {
  return (
    <>
      <TimerBlock />
      <TaskBlock />
    </>
  );
}
