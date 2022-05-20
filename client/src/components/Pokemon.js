import * as React from 'react'
import { useGetPokemonByNameQuery } from '../redux/pokemon.api';

export default function Pokemon() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  const { data: data2, error: error2, isLoading: isLoading2 } = useGetPokemonByNameQuery('pikachu');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  return (
    <div className="text-center d-flex" style={{ justifyContent: 'space-evenly' }}>
      <div>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <h3>{data.species.name}</h3>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </div>

      <div>
        {error2 ? (
          <>Oh no, there was an error</>
        ) : isLoading2 ? (
          <>Loading...</>
        ) : data2 ? (
          <>
            <h3>{data2.species.name}</h3>
            <img src={data2.sprites.front_shiny} alt={data2.species.name} />
          </>
        ) : null}
      </div>
    </div>
  )
}