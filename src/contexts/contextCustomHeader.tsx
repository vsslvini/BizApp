// contexts/contextCustomHeader.tsx (SIMPLIFIED VERSION)

import React, { createContext, useState, useContext, ReactNode } from "react"; // <--- 'useMemo' was removed from here
import Feather from '@expo/vector-icons/Feather';

// 1. Type definition for Header options (Contract).
type HeaderOptions = {
    title: string;
    subTitle: string;
    gradientColors: readonly [string, string];
    subTitleConfirm: boolean;
    nextPage: boolean;
    nameIcon?: React.ComponentProps<typeof Feather>["name"];
    routerHeaderOptions: () => void

};

// 2. Type definition for the full Context value.
type HeaderContextType = HeaderOptions & {
    setHeaderOptions: (options: Partial<HeaderOptions>) => void;
};

// 3. Context creation with a default value.
const HeaderContext = createContext<HeaderContextType>({
    title: "Loading...",
    subTitle: "loading",
    gradientColors: ['#6a11cb', '#2575fc'],
    nextPage: false,
    nameIcon: undefined,
    subTitleConfirm: false,
    routerHeaderOptions: () => { },
    setHeaderOptions: () => { },
});

// 4. Provider creation - Our "Command Center"
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    // The "Magic Board" that holds the information.
    const [headerOptions, setHeaderOptionsInternal] = useState<HeaderOptions>({
        title: "My Application",
        subTitle: "",
        gradientColors: ['#6a11cb', '#2575fc'],
        nextPage: false,
        subTitleConfirm: false,
        nameIcon: undefined,
        routerHeaderOptions: () => { },
    });

    // The "Intelligent Secretary" that updates the board.
    const setHeaderOptions = (newOptions: Partial<HeaderOptions>) => {
        setHeaderOptionsInternal(prevOptions => ({ ...prevOptions, ...newOptions }));
    };

    // The value that will be distributed to the app.
    // We simply create the object we want to share.
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

// 5. Custom hook to consume the context.
export const useHeaderOptions = () => {
    return useContext(HeaderContext);
};