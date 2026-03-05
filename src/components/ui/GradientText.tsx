import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";

type GradientTextProps = {
    text: string;
    style?: StyleProp<TextStyle>;
    gradient: [string, string];
};

export default function GradientText({ text, style, gradient }: GradientTextProps) {



    return (
        <MaskedView
            maskElement={
                <Text style={[styles.text, style]}>
                    {text}
                </Text>
            }
        >
            <LinearGradient
                colors={gradient || ["#ff7e5f", "#feb47b"]} // your gradient colors
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                {/* Invisible text to give size */}
                <Text style={[styles.text, style, { opacity: 0 }]}>
                    {text}
                </Text>
            </LinearGradient>
        </MaskedView>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 40,
        fontWeight: "bold",
    },
});
