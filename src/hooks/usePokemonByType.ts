import usePokemonList, { PokemonListType } from "../context/PokeListContext";
import { getIdFromUrl, getImageUrl } from "../utils/masonryUtils";

export const usePokemonByType = () => {
  const { typeCache, setTypeCache } = usePokemonList();

  const getPokemonByType = async (type: string): Promise<PokemonListType[]> => {
    const cached = typeCache[type];

    if (cached && cached.length > 0) {
      return cached;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const data = await res.json();

    const fetchedTypeData: PokemonListType[] = data.pokemon.map((p: any) => {
      const id = getIdFromUrl(p.pokemon.url);

      return {
        id,
        name: p.pokemon.name,
        image: getImageUrl(id),
      };
    });

    setTypeCache((prev) => ({
      ...prev,
      [type]: fetchedTypeData,
    }));

    return fetchedTypeData;
  };

  return { getPokemonByType };
};
