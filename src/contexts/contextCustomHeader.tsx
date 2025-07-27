// contexts/contextCustomHeader.js (VERSÃO SIMPLIFICADA)

import React, { createContext, useState, useContext, ReactNode } from "react"; // <--- 'useMemo' foi removido daqui
import Feather from '@expo/vector-icons/Feather';

// 1. Definição do tipo para as opções do Header (Contrato).
type HeaderOptions = {
    title: string;
    subTitle: string;
    gradientColors: readonly [string, string];
    subTitleConfirm: boolean;
    nextPage: boolean;
    nameIcon: React.ComponentProps<typeof Feather>["name"];
    routerHeaderOptions: () => void

};

// 2. Definição do tipo para o valor completo do Contexto.
type HeaderContextType = HeaderOptions & {
    setHeaderOptions: (options: Partial<HeaderOptions>) => void;
};

// 3. Criação do Contexto com um valor padrão.
const HeaderContext = createContext<HeaderContextType>({
    title: "Carregando...",
    subTitle: "carregando",
    gradientColors: ['#6a11cb', '#2575fc'],
    nextPage: false,
    nameIcon: "home",
    subTitleConfirm: false,
    routerHeaderOptions: () => { },
    setHeaderOptions: () => { },
});

// 4. Criação do Provedor (Provider) - A nossa "Central de Comando"
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    // A "Lousa Mágica" que guarda a informação. Continua igual.
    const [headerOptions, setHeaderOptionsInternal] = useState<HeaderOptions>({
        title: "Minha aplicação",
        subTitle: "",
        gradientColors: ['#6a11cb', '#2575fc'],
        nextPage: false,
        subTitleConfirm: false,
        nameIcon: "home",
        routerHeaderOptions: () => { },
    });

    // O "Secretário Inteligente" que atualiza a lousa. Continua igual.
    const setHeaderOptions = (newOptions: Partial<HeaderOptions>) => {
        setHeaderOptionsInternal(prevOptions => ({ ...prevOptions, ...newOptions }));
    };

    // O valor que será distribuído para o app. AGORA SEM useMemo!
    // Simplesmente criamos o objeto que queremos compartilhar.
    const value = {
        ...headerOptions, // As informações da lousa (título e cores)
        setHeaderOptions, // A função do secretário para que as telas possam usá-la
    };

    return (
        <HeaderContext.Provider value={value}>
            {children}
        </HeaderContext.Provider>
    );
};

// 5. Hook customizado para consumir o contexto. Continua igual.
export const useHeaderOptions = () => {
    return useContext(HeaderContext);
};