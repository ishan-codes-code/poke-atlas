import { typeIcons } from "@/src/constants/pokeConstants";
import useTheme from "@/src/context/ThemeContext";
import { Text, View } from "react-native";
import { ApplyProperty } from "../FilterSheet";
import AnimatedPressable from "./AnimatedPressable";

interface Props {
    selected: ApplyProperty;
    setSelected: React.Dispatch<React.SetStateAction<ApplyProperty>>;

}


export const TypeList = ({ selected, setSelected }: Props) => {

    const { colors } = useTheme();



    return (
        <>
            <View style={{

                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
            }}>
                {typeIcons.map((t, i) => {
                    const isSelected = selected.type?.includes(t.type);

                    return (
                        <AnimatedPressable key={t.type}
                            onPress={() => setSelected(prev => {
                                const prevTypes = Array.isArray(prev.type)
                                    ? prev.type
                                    : prev.type ? [prev.type] : [];

                                return {
                                    ...prev,
                                    type: prevTypes.includes(t.type)
                                        ? prevTypes.filter(tName => tName !== t.type)
                                        : [...prevTypes, t.type]
                                };
                            })}
                            pressableStyles={{
                                width: "47%"

                            }}
                            viewStyles={{
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                borderRadius: 50,
                                backgroundColor: isSelected
                                    ? colors.types[t.type as keyof typeof colors.types]
                                    : colors.input,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 8,
                            }}>
                            <Text style={{
                                color:
                                    isSelected ? "#000" : colors.textPrimary,
                                fontWeight: "600",
                                textTransform: "capitalize",
                            }}>{t.type} {t.emoji}</Text>
                        </AnimatedPressable>



                    );
                })}
            </View>
            <Text style={{
                color: colors.textSecondary,
                marginTop: 50,
                fontSize: 14,
                textAlign: "center",
            }}>
                Select Pokémon Types
            </Text>
        </>
    );
};
