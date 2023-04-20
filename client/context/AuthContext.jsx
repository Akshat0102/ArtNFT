import { React, createContext, useState } from "react";

export const AuthContext = createContext({
    connectWallet: () => { },
    isConnected: false,
    accountAddress: null
})

export const AuthProvider = ({ children }) => {
    const [accountAddress, setAccountAddress] = useState(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Metamask Extension not installed!!")
        } else {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccountAddress(accounts[0]);
            } catch (err) {
                console.log(err);
                alert('Error connecting...');
            }
        }
    };

    return (
        <AuthContext.Provider value={{
            connectWallet,
            accountAddress
        }}>
            {children}
        </AuthContext.Provider>
    );
};

