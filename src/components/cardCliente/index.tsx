import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ClienteDataBase } from '@/storage/types'; // Importando o tipo
import { colors } from '@/theme/colors'; // Supondo que você tenha um arquivo de cores

type Props = {
    data: ClienteDataBase;
    onPress: () => void;
};

// Componente para exibir um único cliente na lista
export function Cliente({ data, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{data.nome}</Text>
                {data.telefone ? <Text style={styles.details}>{data.telefone}</Text> : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.gray, // Uma cor de fundo para o card
        padding: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.lightGray, // Uma borda sutil
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.black,
    },
    details: {
        fontSize: 14,
        color: colors.darkGray,
        marginTop: 4,
    },
});
