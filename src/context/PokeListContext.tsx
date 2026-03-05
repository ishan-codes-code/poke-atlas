import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { PokemonExploreDetails } from "../types/pokemon";
import { getIdFromUrl, getImageUrl } from "../utils/masonryUtils";


export interface PokemonListType {
    id: number;
    name: string;
    image: string;
}

interface PokeContextType {
    pokemonList: PokemonListType[];
    typeCache: Record<string, PokemonListType[]>;
    setTypeCache: React.Dispatch<React.SetStateAction<Record<string, PokemonListType[]>>>;
    detailsCache: Record<number, PokemonExploreDetails>;
    setDetailsCache: React.Dispatch<React.SetStateAction<Record<number, PokemonExploreDetails>>>;
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

const PokeListContext = createContext<PokeContextType | undefined>(undefined);

export const PokeListProvider = ({ children }: { children: ReactNode }) => {

    const [pokemonList, setPokemonList] = useState<PokemonListType[]>([])
    const [typeCache, setTypeCache] = useState<Record<string, PokemonListType[]>>({});
    const [detailsCache, setDetailsCache] = useState<Record<number, PokemonExploreDetails>>({});



    useEffect(() => {
        const loadPokemonList = async () => {
            const list = await fetchPokeList();
            setPokemonList(list);
        }
        loadPokemonList();
    }, [])


    return (
        <PokeListContext.Provider value={{
            pokemonList,
            typeCache,
            setTypeCache,
            detailsCache,
            setDetailsCache,
        }}>
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
