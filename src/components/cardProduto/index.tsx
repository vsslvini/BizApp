import { Pressable, PressableProps, Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = PressableProps &  TouchableOpacityProps & {
    data: {
        id: number,
        nome: string,
        precoCusto: number,
        precoVenda: number,
        quantidadeEstoque: number
    }

}

export function Produto({ data, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding: 8, margin: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>  Nome do produto: {data.nome}</Text>
                <Text>  Quantidade: {data.quantidadeEstoque}  </Text>
                <Text>  Preço de custo: {data.precoCusto}  </Text>
                <Text>  Preço para venda: {data.precoVenda}  </Text>
            </View>
        </TouchableOpacity>)
}