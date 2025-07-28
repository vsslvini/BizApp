import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { colors, gradientes } from '@/utils/colors';

interface GradientIconProps {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    size: number;
    gradientColors: readonly [string, string, ...string[]];
}

export function GradientIcon({ name, size, gradientColors }: GradientIconProps) {
    return (
        // O MaskedView é o container principal.
        // O estilo dele define a área total do nosso ícone.
        <MaskedView
            style={{ width: size, height: size }}

            // A prop 'maskElement' é o que define o "molde" ou a "forma".
            // Tudo que estiver aqui dentro servirá como uma máscara.
            maskElement={
                // Usamos uma View para garantir que o ícone fique perfeitamente centralizado
                // dentro da área da máscara. É uma boa prática.
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <FontAwesome name={name} size={size} color="black" />
                </View>
            }
        >
            {/* Este é o conteúdo que será "mostrado através" da máscara.
        Nosso gradiente preenche toda a área do MaskedView, 
        mas só será visível onde a máscara (o ícone) permitir.
      */}1
            <LinearGradient
                colors={gradientColors}
                style={{ flex: 1 }}
            />
        </MaskedView>
    );
}