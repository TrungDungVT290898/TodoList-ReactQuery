import React, { useState } from 'react'
import { ISuperHero } from '../../../models/SuperHero'
import { useParams } from "react-router-dom"
import useQueryIdSPHook from '../../../hooks/useQueryIdSHook'
import spHeroesAPI from '../../../api/spHeroesAPI'
import { useDeleteHeroMutation, useUpdateHeroMutation } from '../../../hooks/HeroHook'
import { useQueryClient } from '@tanstack/react-query';

const DetailHeroPage = () => {
    const params = useParams();
    const queryClient = useQueryClient();
    const { data } = useQueryIdSPHook({ heroId: params.id as string, fetchData: spHeroesAPI.getById });
    const deleteMutation = useDeleteHeroMutation(
        {
            onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rqsuperheroes"] })
        }
    );
    const updateMutation = useUpdateHeroMutation({
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["rqsuperheroes"] })
    });
    const [name, setName] = useState<string>("");
    const [alterEgo, setAlterEgo] = useState<string>("");
    const handleUpdateClick = () => {
        const hero = { id: data?.id, name, alterEgo } as ISuperHero
        console.log(hero);
        updateMutation.mutate(hero);

    }
    const handleRemoveClick = () => {
        deleteMutation.mutate(data?.id!);
    }
    return (
        <React.Fragment>
            <div>
                {
                    `${data?.name} - ${data?.alterEgo} `
                }
            </div>
            <div>
                <label htmlFor='name'>Name</label>
                <input type="text"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    key="button-name"

                />
                <label htmlFor='ego'>Ego</label>
                <input type="text"
                    onChange={(e) => setAlterEgo(e.target.value)}
                    name="ego"
                    key="button-ego"
                />
                <button onClick={handleUpdateClick}>UPDATE HERO</button>
                <button onClick={handleRemoveClick}>DELETE HERO</button>
            </div>
        </React.Fragment>

    )
}

export default DetailHeroPage