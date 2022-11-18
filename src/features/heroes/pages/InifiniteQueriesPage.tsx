import React from 'react'
import { useQuery } from "@tanstack/react-query"
import colorsAPI from '../../../api/colorAPI'
type Props = {}

function InifiniteQueriesPage({ }: Props) {
    const { isLoading, isError, error, data } = useQuery(
        ["colors"],
        () => colorsAPI.getAll()
    )
    return (
        <div>
            {isLoading ?
                (<>Loading...</>) :
                (<>
                    {
                        data?.map(color => (
                            <div key={color.id}>
                                {color.name}
                            </div>
                        ))
                    }
                </>)
            }
        </div>
    )
}

export default InifiniteQueriesPage