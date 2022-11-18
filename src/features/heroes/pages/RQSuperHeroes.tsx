
import { useQueryClient } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import spHeroesAPI from '../../../api/spHeroesAPI';
import { Outlet, Link } from "react-router-dom"

import { ISuperHero } from '../../../models/SuperHero';
import useQuerySpHeroesHook, { IHeroMutationProps, useAddHeroMutation } from '../../../hooks/HeroHook';

type Props = {}

const RQSuperHeroes = (props: Props) => {
    const [name, setName] = useState<string>("");
    const [alterEgo, setAlterEgo] = useState<string>("");
    const queryClient = useQueryClient();
    const onFetchingError = (err: any) => {
        console.log("fetching spheroes failed,err:", err);
    }
    const onFetchingSuccess = (data: ISuperHero[]) => {

    }
    const fetchData = () => {
        return spHeroesAPI.getAll();


    }
    const onAddSPSuccess = () => {
        console.log("add sucess,invalidating queries...");
        queryClient.invalidateQueries({ queryKey: ["rqsuperheroes"] });
    }
    const onAddSPError = () => {
        console.log("add error...");

    }

    const { mutate } = useAddHeroMutation({ onError: onAddSPError, onSuccess: onAddSPSuccess });

    const handleAddHeroClick = () => {
        mutate({
            name, alterEgo
        } as ISuperHero)
    }
    const { isLoading, isError, isSuccess, data, error } = useQuerySpHeroesHook(
        {
            onSuccess: onFetchingSuccess, onError: onFetchingError, fetchData
        })
    // Mutations
    return (
        <React.Fragment>
            <div key={`div container`}>
                <label htmlFor='name'>Name</label>
                <input type="text"
                    value={name}
                    name="name"
                    key="button-name"
                    onChange={(e) => setName(n => e.target.value)}
                />
                <label htmlFor='ego'>Ego</label>
                <input type="text"
                    value={alterEgo}
                    name="ego"
                    key="button-ego"
                    onChange={(e) => setAlterEgo(n => e.target.value)}
                />
                <button onClick={handleAddHeroClick}>ADD HERO</button>

            </div>
            <div>
                {isLoading ? (<>Loading...</>) : isSuccess ? (
                    <>
                        {data?.map(hero => (
                            <div key={`hero-container-${hero.name}`}>
                                <Link to={`${hero.id}`} key={hero?.name}>
                                    {hero?.name}
                                </Link>
                            </div>

                        ))
                        }
                    </>
                )
                    : (<>{error}</>)
                }
            </div>
            <div style={{ backgroundColor: "black", height: 5 }}></div>
            <Outlet />
        </React.Fragment>


    )
}

export default RQSuperHeroes