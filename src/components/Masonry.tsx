import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator } from "react-native";
import usePokemonList, { PokemonListType } from "../context/PokeListContext";
import { usePokemonByType } from "../hooks/usePokemonByType";
import { PokemonExploreDetails } from "../types/pokemon";
import { fetchPokemonDetailsPage } from "../utils/masonryUtils";
import PokemonCard from "./ui/PokemonCard";



const LIMIT = 20;

export default function PokeMasonry() {
    const [pokemon, setPokemon] = useState<PokemonListType[]>([]);
    const [loading, setLoading] = useState(false);

    const { type } = useLocalSearchParams();
    const selectedType = Array.isArray(type) ? type[0] : type;

    const { pokemonList, detailsCache, setDetailsCache, } = usePokemonList();

    const sourceRef = useRef<PokemonListType[]>([]);
    const offsetRef = useRef(0);
    const loadingRef = useRef(false);
    const requestIdRef = useRef(0);

    const [detailsMap, setDetailsMap] = useState<Record<number, PokemonExploreDetails>>({});

    const { getPokemonByType } = usePokemonByType();

    const runDetails = async (nextPage: PokemonListType[]) => {
        await new Promise((resolve) => setTimeout(resolve, 0));

        const cachedDetails: PokemonExploreDetails[] = [];
        const missingIds: number[] = [];

        for (const p of nextPage) {
            const cached = detailsCache[p.id];

            if (cached !== undefined) {
                cachedDetails.push(cached);
            } else {
                missingIds.push(p.id);
            }
        }



        let missingDetails: PokemonExploreDetails[] = [];

        if (missingIds.length > 0) {
            missingDetails = await fetchPokemonDetailsPage(missingIds);
        }

        const allDetails = [...cachedDetails, ...missingDetails];

        const map: Record<number, PokemonExploreDetails> = {};
        allDetails.forEach((d) => {
            map[d.id] = d;
        });

        setDetailsMap((prev) => ({ ...prev, ...map }));

        setDetailsCache((prev) => {
            const map = { ...prev };

            missingDetails.forEach((d) => {
                map[d.id] = d;
            });

            return map;
        });

    };

    const loadMore = async (fromOffset?: number) => {
        if (loadingRef.current) return;

        const source = sourceRef.current;
        const start = fromOffset ?? offsetRef.current;
        const nextPage = source.slice(start, start + LIMIT);

        if (nextPage.length === 0) return;

        offsetRef.current = start + nextPage.length;
        setPokemon((prev) => [...prev, ...nextPage]);

        loadingRef.current = true;
        setLoading(true);
        try {
            await runDetails(nextPage);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    useEffect(() => {
        const requestId = ++requestIdRef.current;
        let active = true;

        const init = async () => {
            setPokemon([]);
            setDetailsMap({});
            offsetRef.current = 0;

            loadingRef.current = true;
            setLoading(true);

            let source: PokemonListType[] = [];
            if (selectedType) {
                source = await getPokemonByType(selectedType);
            } else {
                source = pokemonList;
            }

            if (!active || requestId !== requestIdRef.current) return;

            sourceRef.current = source;

            const firstPage = source.slice(0, LIMIT);
            setPokemon(firstPage);
            offsetRef.current = firstPage.length;

            if (firstPage.length > 0) {
                await runDetails(firstPage);
            }

            if (!active || requestId !== requestIdRef.current) return;
            loadingRef.current = false;
            setLoading(false);
        };

        init();

        return () => {
            active = false;
        };
    }, [selectedType, pokemonList]);

    return (
        <FlashList
            data={pokemon}
            renderItem={({ item }) => <PokemonCard pokemon={item} details={detailsMap[item.id]} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            masonry
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
            style={{ marginTop: 20 }}
        />
    );
}
