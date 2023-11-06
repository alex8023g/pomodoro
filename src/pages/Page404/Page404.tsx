import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import Img404 from '../../img/404-1.jpeg';
import { NavLink, useNavigate } from 'react-router-dom';
// import styles from './page404.css';

export function Page404() {
  return (
    <>
      <Card sx={{ margin: '0 auto', maxWidth: 406 }}>
        <CardMedia sx={{ height: 140 }} image={Img404} title='green iguana' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Страница не найдена
          </Typography>
          {/* <Typography variant='body2' color='text.secondary'>
            Lizards are a widespread group of squamate reptiles, with over 6,000 species,
            ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
        <CardActions>
          <NavLink to='./'>
            <Button size='small'>Вернуться на главную страницу</Button>
          </NavLink>
        </CardActions>
      </Card>
    </>
  );
}
