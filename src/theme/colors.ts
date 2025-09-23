import { blue } from "react-native-reanimated/lib/typescript/Colors";

import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";


const colors = {
    white: '#FFFFFF',
    black: '#000000',
    primary: '#2563EB', // Azul primário
    azul: '#2575fc',
    lilas: '#6a11cb',
    purpura: '#9533E6',
    salmao: '#BE185E',
}

const gradientes = {
    g1: ['#4338CA','#2563EB' ],
    g2: ['#9533E6', '#BE185E'],
    g3: ['#5046E5', '#b94fbdff'],
    g4: ['#16A34A','#4ADE80'],
    g5: ['#F97316', '#F59E0B' ],
    g6: ['#059669', '#10B981' ]
} as const


export {colors, gradientes}