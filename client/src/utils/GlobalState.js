import React, { createContext, useContext, useState } from 'react';

const ReceivedListsContext = createContext();

export const useReceivedListsContext = () => useContext(ReceivedListsContext);

export const ReceivedListsProvider = ({ children }) => {
    const [receivedLists, setReceivedLists] = useState([])

    return (
        <ReceivedListsContext.Provider
            value={{ receivedLists, setReceivedLists}}
        >
            {children}
        </ReceivedListsContext.Provider>
    )

}