import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getIdFromUrl, getImageUrl } from "../utils/masonryUtils";


export interface PokemonListType {
    id: number;
    name: string;
    image: string;
}

const fetchPokeList = async (): Promise<PokemonListType[]> => {

    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
    const data = await response.json();

    return data.results.map((pokemon: any): PokemonListType => {
        const id = getIdFromUrl(pokemon.url);

        return {
            id: id,
            name: pokemon.name,
            image: getImageUrl(id),


        }
    }
    )
}

const PokeListContext = createContext<PokemonListType[] | undefined>(undefined)

export const PokeListProvider = ({ children }: { children: ReactNode }) => {

    const [pokemonList, setPokemonList] = useState<PokemonListType[]>([])

    useEffect(() => {
        const loadPokemonList = async () => {
            const list = await fetchPokeList();
            setPokemonList(list);
        }
        loadPokemonList();
    }, [])


    return (
        <PokeListContext.Provider value={pokemonList}>
            {children}
        </PokeListContext.Provider>

    )

}

const usePokemonList = () => {
    const context = useContext(PokeListContext);
    if (context === undefined) {
        throw new Error("usePokemonList must be used within a PokeListProvider")
    }
    return context
}

export default usePokemonList;