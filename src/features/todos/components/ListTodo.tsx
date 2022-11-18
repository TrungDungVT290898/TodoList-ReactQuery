import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
import { IToDo } from '../../../models/Todo';
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export interface IListToDoPageProps {
    todos: IToDo[],
    handleChangeCompleteState: (todo: IToDo) => void;
    handleRemoveTodoItem: (id: number) => void;
}
export default function ListTodo({ todos, handleChangeCompleteState, handleRemoveTodoItem }: IListToDoPageProps) {
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            aria-label="contacts"
        >
            {
                todos ? todos.map(todo => (
                    <ListItem disablePadding>

                        <ListItemText sx={{}} primary={todo.name} />
                        <Switch
                            edge="end"
                            onChange={() => handleChangeCompleteState(todo)}
                            checked={todo.isComplete}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-wifi',
                            }}
                        />
                        <Button onClick={() => handleRemoveTodoItem(todo.id!)} variant="outlined" >
                            <CloseIcon />
                        </Button>



                    </ListItem>
                )) : (<>Not Found</>)
            }


        </List>
    );
}