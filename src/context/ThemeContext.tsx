import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export interface ColorScheme {
    // Core surfaces
    background: string;
    content: string;
    sidebar: string;
    navbar: string;
    card: string;
    input: string;

    hover: string;
    active: string;

    border: string;
    borderStrong: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textDisabled: string;

    // Accent
    accent: string;
    accentSoft: string;
    accentHover: string;

    // Status
    success: string;
    successBg: string;
    error: string;
    errorBg: string;
    warning: string;
    warningBg: string;
    info: string;
    infoBg: string;

    // Pokemon type colors
    types: {
        grass: string;
        fire: string;
        water: string;
        electric: string;
        psychic: string;
        ice: string;
        dragon: string;
        dark: string;
        fairy: string;
        fighting: string;
        poison: string;
        ground: string;
        rock: string;
        bug: string;
        ghost: string;
        flying: string;
        normal: string;
    };

    // Gradients (for expo-linear-gradient)

    gradients: {
        grass: [string, string];
        fire: [string, string];
        water: [string, string];
        electric: [string, string];
        psychic: [string, string];
        ice: [string, string];
        dragon: [string, string];
        dark: [string, string];
        fairy: [string, string];
        fighting: [string, string];
        poison: [string, string];
        ground: [string, string];
        rock: [string, string];
        bug: [string, string];
        ghost: [string, string];
        flying: [string, string];
        normal: [string, string];
    },

};

const LightTheme: ColorScheme = {
    // ===== Core Surfaces =====
    background: "#F8FAFC",      // App background
    content: "#FFFFFF",
    sidebar: "#F1F5F9",
    navbar: "#FFFFFF",
    card: "#FFFFFF",
    input: "#F1F5F9",

    hover: "#E2E8F0",
    active: "#CBD5E1",

    border: "#E2E8F0",
    borderStrong: "#CBD5E1",

    // ===== Text =====
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    textDisabled: "#94A3B8",

    // ===== Main Accent (Pokémon Yellow) =====
    accent: "#FFCB05",
    accentSoft: "#FFF3BF",
    accentHover: "#FACC15",

    // ===== Status =====
    success: "#22C55E",
    successBg: "#DCFCE7",

    error: "#EF4444",
    errorBg: "#FEE2E2",

    warning: "#F59E0B",
    warningBg: "#FEF3C7",

    info: "#3B82F6",
    infoBg: "#DBEAFE",

    // ===== Pokémon Type Colors =====
    types: {
        grass: "#22C55E",
        fire: "#EF4444",
        water: "#3B82F6",
        electric: "#FACC15",
        psychic: "#D946EF",
        ice: "#06B6D4",
        dragon: "#6366F1",
        dark: "#374151",
        fairy: "#F472B6",
        fighting: "#F97316",
        poison: "#A855F7",
        ground: "#CA8A04",
        rock: "#78716C",
        bug: "#84CC16",
        ghost: "#6366F1",
        flying: "#38BDF8",
        normal: "#9CA3AF"
    },

    // ===== Gradients (Array format for Expo) =====
    gradients: {
        electric: ["#FFCB05", "#FDE047"],
        fire: ["#FCA5A5", "#FDBA74"],
        water: ["#93C5FD", "#67E8F9"],
        grass: ["#86EFAC", "#4ADE80"],
        psychic: ["#F0ABFC", "#D8B4FE"],
        ice: ["#A5F3FC", "#67E8F9"],
        dark: ["#9CA3AF", "#6B7280"],

        dragon: ["#A5B4FC", "#818CF8"],
        fairy: ["#FBCFE8", "#F9A8D4"],
        fighting: ["#FDBA74", "#FB923C"],
        poison: ["#D8B4FE", "#C084FC"],
        ground: ["#FDE68A", "#FACC15"],
        rock: ["#D4D4D8", "#A3A3A3"],
        bug: ["#BEF264", "#A3E635"],
        ghost: ["#C7D2FE", "#A5B4FC"],
        flying: ["#BAE6FD", "#7DD3FC"],
        normal: ["#F5F5F5", "#D4D4D8"],
    }
};

const DarkTheme: ColorScheme = {
    // ===== Core Dark Surfaces =====
    background: "#0B0B0C",        // App background (deep black)
    content: "#111113",           // Main content area
    sidebar: "#161618",           // Sidebar / secondary panels
    navbar: "#111113",
    card: "#1C1C1F",              // Cards / modals
    input: "#222226",             // Input background

    hover: "#2A2A2F",
    active: "#33333A",

    border: "#2A2A2E",
    borderStrong: "#3A3A40",

    // ===== Text =====
    textPrimary: "#E4E4E7",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",
    textDisabled: "#52525B",

    // ===== Pokémon Accent Colors =====
    accent: "#FFCB05",            // Pokémon Electric Yellow
    accentSoft: "#3A2E00",
    accentHover: "#FFD84D",

    // ===== Status Colors =====
    success: "#4ADE80",           // Grass-type green
    successBg: "#052E16",

    error: "#F87171",             // Fire-type red
    errorBg: "#3A0B0B",

    warning: "#FBBF24",           // Electric / Ground vibe
    warningBg: "#3A2A05",

    info: "#60A5FA",              // Water-type blue
    infoBg: "#0B1F3A",

    // ===== Pokémon Type Colors (for badges, tags, etc.) =====
    types: {
        grass: "#4ADE80",
        fire: "#F87171",
        water: "#60A5FA",
        electric: "#FACC15",
        psychic: "#E879F9",
        ice: "#67E8F9",
        dragon: "#818CF8",
        dark: "#52525B",
        fairy: "#F9A8D4",
        fighting: "#FB923C",
        poison: "#C084FC",
        ground: "#CA8A04",
        rock: "#A3A3A3",
        bug: "#A3E635",
        ghost: "#818CF8",
        flying: "#7DD3FC",
        normal: "#D4D4D8"
    },

    // ===== Gradients (Optional Pokémon Feel) =====
    gradients: {
        grass: ["#4ADE80", "#22C55E"],
        fire: ["#F87171", "#FB923C"],
        water: ["#60A5FA", "#38BDF8"],
        electric: ["#FACC15", "#FDE047"],
        psychic: ["#E879F9", "#C084FC"],
        ice: ["#67E8F9", "#38BDF8"],
        dragon: ["#818CF8", "#6366F1"],
        dark: ["#3F3F46", "#18181B"],
        fairy: ["#F9A8D4", "#F472B6"],
        fighting: ["#FB923C", "#F97316"],
        poison: ["#C084FC", "#A855F7"],
        ground: ["#CA8A04", "#A16207"],
        rock: ["#A3A3A3", "#737373"],
        bug: ["#A3E635", "#65A30D"],
        ghost: ["#818CF8", "#6366F1"],
        flying: ["#7DD3FC", "#38BDF8"],
        normal: ["#E5E7EB", "#A1A1AA"],
    },
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const scheme = useColorScheme()

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (scheme === "dark") {
            setIsDarkMode(true)
        }

        //todo: get from local storage
    }, [])

    const toggleDarkMode = () => {
        setIsDarkMode((p) => !p)
        //todo: add in local storage also 
    }

    const colors = isDarkMode ? DarkTheme : LightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
            {children}
        </ThemeContext.Provider>
    )
}


const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a themeprovider")
    }

    return context
}

export default useTheme
