import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Stat = {
    name: string;
    value: number;
};

const MAX_STAT = 150;

const getStatColor = (value: number): readonly [string, string] => {
    if (value < 50) return ["#ff6b6b", "#ff8787"];       // low
    if (value < 90) return ["#f59f00", "#ffd43b"];       // medium
    if (value < 120) return ["#40c057", "#69db7c"];      // good
    return ["#339af0", "#74c0fc"];                       // elite
};

const formatName = (name: string) =>
    name.replace("special-", "Sp ").toUpperCase();

export const StatCard = ({ stat }: { stat: Stat }) => {
    const percentage = Math.min(stat.value / MAX_STAT, 1);
    const colors = getStatColor(stat.value);

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.name}>{formatName(stat.name)}</Text>
                <Text style={styles.value}>{stat.value}</Text>
            </View>

            <View style={styles.barBackground}>
                <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${percentage * 100}%` }]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        // flex: 1,
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 14,
        margin: 6,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    name: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6B7280",
    },
    value: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#111",
    },
    barBackground: {
        height: 8,
        backgroundColor: "#f1f3f5",
        borderRadius: 6,
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        borderRadius: 6,
    },
});


// About

//  <View style={styles.about}>
//                     <View style={{ alignItems: "center", gap: 4 }}>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }} >
//                             <Ionicons name="scale-outline" size={20} color={colors.textSecondary} />
//                             <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
//                                 {(pokemon.weight / 10).toFixed(2)} kg ({((pokemon.weight / 10) * 2.20462).toFixed(2)} lbs)
//                             </Text>
//                         </View>
//                         <Text style={{ color: colors.textMuted, fontWeight: "600" }}>Weight</Text>
//                     </View>
//                     <View style={{ alignItems: "center", gap: 4 }}>
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }} >
//                             {/* <Ionicons name="contract-outline" size={20} color={colors.textSecondary} /> */}
//                             <MaterialCommunityIcons name="ruler" size={20} color={colors.textMuted} />

//                             <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
//                                 {(pokemon.height / 10).toFixed(2)} m ({((pokemon.height / 10) * 3.28084).toFixed(2)} ft)
//                             </Text>
//                         </View>
//                         <Text style={{ color: colors.textMuted, fontWeight: "600" }}>Height</Text>
//                     </View>



//                 </View>