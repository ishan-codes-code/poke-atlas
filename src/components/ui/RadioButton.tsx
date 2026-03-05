import React from "react";
import { TouchableOpacity, View } from "react-native";

type Props = {
    label?: string;
    value: string;
    selected: string;
    onSelect: (value: string) => void;
};

export default function RadioButton({ value, selected, onSelect }: Props) {
    const isSelected = selected === value;

    return (
        <TouchableOpacity
            onPress={() => onSelect(value)}
            style={{
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            {/* Outer Circle */}
            <View
                style={{
                    width: 20,
                    height: 20,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: isSelected ? "#FF6B00" : "#999",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Inner Circle */}
                {isSelected && (
                    <View
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: 6,
                            backgroundColor: "#FF6B00",
                        }}
                    />
                )}
            </View>

            {/* <Text style={{ marginLeft: 12, fontSize: 16 }}>
                {label}
            </Text> */}
        </TouchableOpacity>
    );
};


{/* <RadioButton
    label="Fire"
    value="fire"
    selected={selected}
    onSelect={setSelected}
/> */}