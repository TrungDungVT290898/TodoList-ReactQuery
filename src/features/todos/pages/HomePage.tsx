import { Label } from '@mui/icons-material'
import { Button, Divider, Paper, Stack } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import axiosClient from '../../../api/axiosClient'
import todoAPI from '../../../api/todoAPI'
import { IToDo } from '../../../models/Todo'
import ListTodo from '../components/ListTodo'
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
type Props = {}

const HomePage = (props: Props) => {
    const [textTodo, setTextTodo] = useState<string>("");
    const queryClient = useQueryClient();
    const updateMutate = useMutation({
        mutationFn: todoAPI.update,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["todos"])

        },

    });
    const addMutate = useMutation({
        mutationFn: todoAPI.add,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["todos"])

        },

    });
    const deleteMutate = useMutation({
        mutationFn: todoAPI.remove,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["todos"])

        },

    });
    const onFetchDataSuccess = (data: IToDo[] | undefined) => {

    }
    const handleChangeCompleteState = (todo: IToDo) => {
        todo.isComplete = !todo.isComplete;
        updateMutate.mutate(todo);
    }
    const { isLoading, isError, isFetching, isFetched, data } = useQuery(
        {
            queryKey: ["todos"],
            queryFn: todoAPI.getAll,
            onSuccess: onFetchDataSuccess
        }
    )
    const handleAddClick = () => {
        const newITem: IToDo = {
            name: textTodo,
            isComplete: false
        }
        addMutate.mutate(newITem);
    }
    const handleRemoveClick = (id: number) => {
        console.log("remove id:", id);
        deleteMutate.mutate(id);
    }
    return (
        <React.Fragment>
            <Stack>
                {
                    isLoading ? (<>Loading...</>) : (
                        <ListTodo
                            handleChangeCompleteState={handleChangeCompleteState}
                            todos={data!}
                            handleRemoveTodoItem={handleRemoveClick}
                        />)

                }

            </Stack>
            <Divider />
            <Stack>
                <div>
                    <InputLabel htmlFor="input-with-icon-adornment">

                        Fill Todo Item
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        onChange={(e) => setTextTodo(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <TurnedInIcon />
                            </InputAdornment>
                        }
                    />
                    <Button sx={{ marginLeft: 10 }} variant='contained' onClick={handleAddClick}>ADD TO LIST</Button>

                </div>
            </Stack>
        </React.Fragment>
    )
}

export default HomePage