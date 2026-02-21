import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GravityContextType {
    isGravityActive: boolean;
    toggleGravity: () => void;
}

const GravityContext = createContext<GravityContextType | undefined>(undefined);

export const GravityProvider = ({ children }: { children: ReactNode }) => {
    const [isGravityActive, setIsGravityActive] = useState(false);

    const toggleGravity = () => {
        setIsGravityActive((prev) => !prev);
    };

    return (
        <GravityContext.Provider value={{ isGravityActive, toggleGravity }}>
            {children}
        </GravityContext.Provider>
    );
};

export const useGravity = () => {
    const context = useContext(GravityContext);
    if (context === undefined) {
        throw new Error('useGravity must be used within a GravityProvider');
    }
    return context;
};
