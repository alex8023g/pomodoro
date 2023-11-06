import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState } from 'react';
import styles from './header.module.css';
import { ReactComponent as TomatoIcon } from '../../icons/tomato1.svg';
import { ReactComponent as EqualizerIcon } from '../../icons/equalizer.svg';
import { Link, NavLink, Outlet } from 'react-router-dom';

export function Header() {
  return (
    <>
      <AppBar position='sticky' sx={{ display: 'block', mb: 5, bgcolor: 'white' }}>
        <Toolbar
          sx={{ maxWidth: '1440px', justifyContent: 'space-between', margin: '0 auto' }}
        >
          <div className={styles.leftBlock}>
            <Link to='/'>
              <div className={styles.tomatoIcon}>
                <TomatoIcon />
              </div>
              <h1 className={styles.h1}>pomodoro</h1>
            </Link>
          </div>
          <NavLink to='./statistics'>
            <Button sx={{ color: '#DC3E22' }}>
              <div className={styles.EqualizerIcon}>
                <EqualizerIcon />
              </div>
              <span className={styles.statisticsText}>Статистика</span>
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </>
  );
}
