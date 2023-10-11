import React from 'react';
import { TaskBlock } from '../../components/TaskBlock';
import { TimerBlock } from '../../components/TimerBlock';
import { Layout } from '../../components/Layout';

export function TimerPage() {
  return (
    <Layout>
      <TimerBlock />
      <TaskBlock />
    </Layout>
  );
}
