import React, { useEffect, useState } from 'react'
import spHeroesAPI from '../../../api/spHeroesAPI';
import { ISuperHero } from '../../../models/SuperHero';

type Props = {}

const SuperHeroesPage = (props: Props) => {
    const [heroes, setHeroes] = useState<ISuperHero[]>();
    useEffect(() => {
        spHeroesAPI.getAll().then(data =>
            setHeroes(data as ISuperHero[])
        );

    }, [])
    return (
        <div>
            {heroes?.map(hero => (
                <div key={hero.name}>
                    {hero.name}
                </div>
            ))}
        </div>
    )
}

export default SuperHeroesPage