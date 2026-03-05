import React from "react";
import { StyleSheet, View } from "react-native";
import { StatCard } from "./StatsCard";

type Stat = {
    name: string;
    value: number;
};

export const StatsGrid = ({ stats }: { stats: Stat[] }) => {
    return (
        <View style={styles.container}>
            {stats.map((stat) => (
                <StatCard key={stat.name} stat={stat} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: 8,
    },
});