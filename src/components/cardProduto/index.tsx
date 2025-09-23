import { Text, View, TouchableOpacity, TouchableOpacityProps, Image } from "react-native";
import { styles } from "./style"; // Importando os estilos do arquivo separado

type Props = TouchableOpacityProps & {
    data: {
        id: number;
        nome: string;
        precoCusto: number;
        precoVenda: number;
        quantidadeEstoque: number;
    }
}

// Usaremos uma imagem de placeholder, já que não temos uma no banco
const placeholderImage = 'https://via.placeholder.com/80';

export function Produto({ data, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.cardContainer} {...rest}>
            {/* <Image
                source={{ uri: placeholderImage }}
                style={styles.productImage}
            /> */}
            <View style={styles.textContainer}>
                <Text style={styles.productName} numberOfLines={1}>{data.nome}</Text>
                <Text style={styles.productPrice}>
                    {`R$ ${parseFloat(String(data.precoVenda)).toFixed(2).replace('.', ',')}`}
                </Text>
                <Text style={styles.productStock}>{`Estoque: ${data.quantidadeEstoque}`}</Text>
            </View>
        </TouchableOpacity>
    )
}