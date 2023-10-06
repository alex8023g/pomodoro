import React from 'react';
import { TaskBlock } from '../../TaskBlock';
import { TimerBlock } from '../../TimerBlock';
// import styles from './timerpage.css';

export function TimerPage() {
  return (
    <>
      <TimerBlock />
      <TaskBlock />
    </>
  );
}
