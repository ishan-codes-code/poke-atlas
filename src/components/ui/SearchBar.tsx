import useTheme from "@/src/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";
import AnimatedPressable from "./AnimatedPressable";

export function SearchBar() {
    const { colors } = useTheme();

    const router = useRouter();




    return (
        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", gap: 12 }}>

            <AnimatedPressable
                onPress={() => router.push("/explore/search")}
                pressableStyles={{ flex: 1 }}
                viewStyles={{
                    flex: 1,
                    height: 44,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    backgroundColor: colors.input,
                    borderColor: colors.border,
                    borderWidth: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                }}
            >

                <Ionicons
                    name="search-outline"
                    size={20}
                    color={colors.textMuted}
                />
                <Text style={{ color: colors.textMuted, fontSize: 18 }} >
                    Search...
                </Text>

            </AnimatedPressable>
            <AnimatedPressable
                onPress={() => router.setParams({ filterModal: "true" })}
                layout={LinearTransition.springify()}  // ✅ new way
                entering={FadeIn}
                exiting={FadeOut}
                viewStyles={{
                    padding: 12,
                    backgroundColor: colors.input,
                    borderRadius: 10,
                }}>

                <Ionicons name="filter" size={20} color={colors.textPrimary}></Ionicons>


            </AnimatedPressable>


        </View >
    );
}

export function SearchInput() {
    const { colors } = useTheme();
    const router = useRouter();
    const params = useLocalSearchParams();

    const inputRef = useRef<TextInput>(null);
    const query = params.q?.toString() || "";

    const [t, setText] = useState(query); // local state for instant UI update


    // const onChange = (t: string) => {
    //     setText(t);                 // instant UI update
    //     router.setParams({ q: t }); // update route (for search screen)
    // };

    useEffect(() => {
        const timer = setTimeout(() => {
            router.setParams({ q: t });
        }, 300)

        return () => clearTimeout(timer);

    }, [t])



    useEffect(() => {
        const timer = setTimeout(() => {
            inputRef.current?.focus();
        }, 100); // small delay for header mount

        return () => clearTimeout(timer);
    }, []);


    return (
        <View

            style={{
                flexDirection: "row",
                alignItems: "center",
                height: 44,
                paddingHorizontal: 14,
                borderRadius: 10,
                backgroundColor: colors.input,
                borderColor: colors.border,
                borderWidth: 1,
                gap: 8,
            }}
        >
            <Ionicons name="search-outline" size={20} color={colors.textPrimary} />

            <TextInput
                ref={inputRef}
                value={t}
                onChangeText={(t: string) => setText(t)}
                placeholder="Search Pokémon..."
                placeholderTextColor={colors.textMuted}
                autoFocus
                style={{
                    flex: 1,
                    color: colors.textPrimary,
                    fontSize: 18,
                }}

            />
        </View>
    );
}