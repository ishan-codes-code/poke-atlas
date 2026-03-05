import { PokemonListType } from "../context/PokeListContext";

export type PokemonListItem = PokemonListType & {
  types: string[];
  totalStats?: number;
  baseExperience?: number;
  abilities?: string[];
  // sprites: PokemonSprites;
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonAbout = {
  habitat: string;
  growthRate: string;
  captureRate: number;
  gender: string;
  evolutionChainUrl: string;
};

export type PokemonSprites = {
  front: string | undefined;
  back: string | undefined;
  frontShiny: string | undefined;
  backShiny: string | undefined;

  official: string | undefined;
  home: string | undefined;
  dreamWorld: string | undefined;
};

export type Pokemon = PokemonListItem & {
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: string[];
  description?: string;
  habitat?: string;
  growthRate?: string;
  captureRate?: number;
  genderRate?: number;
  evolutionChainUrl?: string;
};
