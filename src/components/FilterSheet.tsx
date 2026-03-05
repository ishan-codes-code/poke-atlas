import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Text, View } from 'react-native'
import useTheme from '../context/ThemeContext'
import AnimatedPressable from './ui/AnimatedPressable'
import { TypeList } from './ui/FilterList'

export type ApplyProperty = {
    type?: string | string[];
};


const FilterSheet = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const filterModal = params.filterModal === "true";

    const [filterProperty, setFilterProperty] = useState("type")
    const [applyProperty, setApplyProperty] = useState<ApplyProperty>({});



    const { colors } = useTheme()


    // useEffect(() => {
    //     setApplyProperty({ type: selectedType })


    // }, [selectedType])

    // console.log(applyProperty)

    return (
        <Modal
            transparent
            visible={filterModal}
            animationType="slide"
            onRequestClose={() => router.setParams({ filterModal: "false" })}
        >
            <View style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "flex-end"
            }}>
                <View style={{
                    backgroundColor: colors.card,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    maxHeight: "85%",
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        padding: 20

                    }}>
                        <Text style={{ color: colors.textPrimary, fontSize: 26, fontWeight: "700" }}>Filters</Text>
                        <AnimatedPressable onPress={() => {
                            setApplyProperty({});
                        }}>
                            <Text style={{
                                color: colors.accent,
                                fontSize: 18,
                                paddingBottom: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: colors.accent
                            }}>Clear All</Text>
                        </AnimatedPressable>
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        // backgroundColor: "#fff",
                    }}>
                        <View style={{ width: "38%", justifyContent: "flex-start", gap: 16, padding: 5 }}>

                            {/* Accent strip */}



                            <AnimatedPressable onPress={() => setFilterProperty("type")}
                                viewStyles={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 14,


                                    borderRadius: 14,
                                    backgroundColor:
                                        filterProperty === "type"
                                            ? colors.active
                                            : colors.card,

                                    // shadow
                                    shadowColor: "#000",
                                    shadowOpacity: 0.05,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 4 },
                                    elevation: 3,
                                }}>
                                <View style={{
                                    width: 4,
                                    height: "100%",
                                    borderRadius: 4,
                                    backgroundColor:
                                        filterProperty === "type"
                                            ? colors.accent
                                            : colors.textDisabled,
                                    marginRight: 10,
                                }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flex: 1
                                }}>
                                    <Text style={{ fontSize: 18, color: colors.textPrimary }}>
                                        Types
                                    </Text>
                                    {applyProperty.type && <Text style={{ fontSize: 18, color: colors.textPrimary }}>
                                        1
                                    </Text>}

                                </View>
                            </AnimatedPressable>

                            <AnimatedPressable onPress={() => setFilterProperty("ability")}
                                viewStyles={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 14,


                                    borderRadius: 14,
                                    backgroundColor: colors.card,

                                    // shadow
                                    shadowColor: "#000",
                                    shadowOpacity: 0.05,
                                    shadowRadius: 10,
                                    shadowOffset: { width: 0, height: 4 },
                                    elevation: 3,
                                }}>
                                <View style={{
                                    width: 4,
                                    height: "100%",
                                    borderRadius: 4,
                                    backgroundColor: colors.textDisabled,
                                    marginRight: 10,
                                }} />
                                <Text style={{ fontSize: 18, color: colors.textPrimary, }}>Abilities</Text>
                            </AnimatedPressable>




                        </View>
                        <View style={{ height: "100%", width: 1, backgroundColor: colors.border }} />
                        <View style={{ width: "60%", padding: 5 }}>
                            <TypeList selected={applyProperty} setSelected={setApplyProperty} />
                        </View>

                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        padding: 20,

                    }}>
                        <AnimatedPressable onPress={() => {
                            setApplyProperty({});
                            router.setParams({ filterModal: "false" });
                        }}
                            viewStyles={{
                                padding: 14, backgroundColor: "transparent",
                                borderWidth: 1,
                                borderColor: colors.borderStrong, borderRadius: 12
                            }}>
                            <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Close</Text>
                        </AnimatedPressable>
                        <AnimatedPressable
                            onPress={() => {
                                router.setParams({
                                    filterModal: "false",
                                    type: applyProperty.type ?? undefined,
                                });
                            }}
                            viewStyles={{ padding: 14, backgroundColor: colors.accent, borderRadius: 12 }}>
                            <Text style={{ color: "#000", fontSize: 16 }}>Apply</Text>
                        </AnimatedPressable>
                    </View>

                </View>






            </View>

        </Modal >

    )
}

export default FilterSheet