import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { Dispatch, SetStateAction } from 'react';
import { style } from './style';
import { ITask } from '../TaskBlock';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import useTaskStore from '../store';

interface asd {
  task: ITask;
  isEdit2: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}

export function TaskMenu({ task, isEdit2, setIsEdit }: asd) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const removeTask = useTaskStore((state) => state.removeTask);
  const increasePomodoroTotal = useTaskStore((state) => state.increasePomodoroTotal);
  const decreasePomodoroTotal = useTaskStore((state) => state.decreasePomodoroTotal);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      {isEdit2 ? (
        <IconButton
          ref={anchorRef}
          // id='composition-button'
          // aria-controls={open ? 'composition-menu' : undefined}
          // aria-expanded={open ? 'true' : undefined}
          // aria-haspopup='true'
          // aria-label='directions'
          color='primary'
          sx={style.iconbutton}
          type='submit'
        >
          <KeyboardReturnIcon />
        </IconButton>
      ) : (
        <IconButton
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          color='primary'
          sx={style.iconbutton}
          aria-label='directions'
        >
          <MoreVertIcon />
        </IconButton>
      )}

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='left-start'
        transition
        disablePortal
        sx={style.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='composition-menu'
                  aria-labelledby='composition-button'
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={() => {
                      increasePomodoroTotal(task);
                    }}
                  >
                    <AddCircleOutlineIcon sx={style.mr8} />
                    Увеличить
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      decreasePomodoroTotal(task);
                    }}
                    disabled={task.pomodoroTotal === 1 ? true : false}
                  >
                    <RemoveCircleOutlineIcon sx={style.mr8} />
                    Уменьшить
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      setIsEdit(true);
                    }}
                  >
                    <ModeEditOutlineIcon sx={style.mr8} />
                    Редактировать
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      removeTask(task);
                    }}
                  >
                    <DeleteOutlineIcon sx={style.mr8} />
                    Удалить
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
