import { Pokemon, PokemonSprites } from "../types/pokemon";

export const getPokemonOfTheDayId = (): Number => {
  const today = new Date();
  const seed =
    today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate();

  return (seed % 1025) + 1;
};

const getPokeAbout = async (url: string): Promise<{}> => {
  const speciesRes = await fetch(url);
  const speciesData = await speciesRes.json();
  const descriptionEntry = speciesData.flavor_text_entries.find(
    (entry: any) => entry.language.name === "en",
  );

  const description = descriptionEntry
    ? descriptionEntry.flavor_text.replace(/\f|\n/g, " ")
    : "No description available.";

  const habitat = speciesData.habitat?.name;

  const growthRate = speciesData.growth_rate?.name;

  const captureRate = speciesData.capture_rate;

  const genderRate = speciesData.gender_rate;

  const evolutionChainUrl = speciesData.evolution_chain.url;
  return {
    description,
    habitat,
    growthRate,
    captureRate,
    genderRate,
    evolutionChainUrl,
  };
};

export const mapSprites = (sprites: any): PokemonSprites => ({
  front: sprites.front_default,
  back: sprites.back_default,
  frontShiny: sprites.front_shiny,
  backShiny: sprites.back_shiny,

  official: sprites.other?.["official-artwork"]?.front_default || null,

  home: sprites.other?.home?.front_default || null,

  dreamWorld: sprites.other?.dream_world?.front_default || null,
});

export const fetchPokemon = async (id: string | Number): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const about = await getPokeAbout(data.species.url);
  return {
    id: data.id,
    name: data.name,
    // sprites: mapSprites(data.sprites),
    image: data.sprites.other?.["official-artwork"]?.front_default,
    types: data.types.map((t: any) => t.type.name),

    height: data.height / 10,
    weight: data.weight / 10,

    stats: data.stats.map((s: any) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),

    abilities: data.abilities.map((a: any) => a.ability.name),
    ...about,
  };
};
