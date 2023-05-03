import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState } from 'react';
import styles from './header.module.css';
import { style } from './styles';
import { ReactComponent as TomatoIcon } from '../icons/tomato1.svg';
import { ReactComponent as EqualizerIcon } from '../icons/equalizer.svg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, NavLink } from 'react-router-dom';

export function Header() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AppBar position='sticky' sx={style.appbar}>
      {/* <AppBar position='sticky' sx={{ bgcolor: 'white' }}> */}
      <Toolbar>
        <div className={styles.leftBlock}>
          <Link to='/'>
            <div className={styles.tomatoIcon}>
              <TomatoIcon />
            </div>
            <h1 className={styles.h1}>pomodoro_box</h1>
            {/* <Typography
              variant='h4'
              component='h1'
              sx={{
                color: 'red',
                pl: '10px',
                mr: 'auto',
              }}
            >
              pomodoro_box
            </Typography> */}
          </Link>
        </div>
        <NavLink to='./statistics'>
          <Button sx={style.button}>
            {/* <Button sx={{ color: '#DC3E22' }}> */}
            <div className={styles.EqualizerIcon}>
              <EqualizerIcon />
            </div>
            <span className={styles.statisticsText}>Статистика</span>
          </Button>
        </NavLink>

        {isLogged ? (
          <AccountCircleIcon
            onClick={() => {
              setIsLogged(!isLogged);
            }}
            htmlColor={'red'}
          />
        ) : (
          <Button
            onClick={() => {
              setIsLogged(!isLogged);
            }}
            sx={style.button}
            // sx={{ color: '#DC3E22' }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
