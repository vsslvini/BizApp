import { Pressable, PressableProps, Text, View } from "react-native";

type Props = PressableProps & {
    data: {
        nome: string,
        precoCusto: number,
        precoVenda: number,
        quantidadeEstoque: number
    }

}

export function Produto({ data, ...rest }: Props) {
    return (
        <Pressable {...rest}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', padding:8, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text>  Nome do produto: {data.nome}</Text>
                <Text>  Quantidade: {data.quantidadeEstoque}  </Text>
                <Text>  Preço de custo: {data.precoCusto}  </Text>
                <Text>  Preço para venda: {data.precoVenda}  </Text>
            </View>
        </Pressable>)
}