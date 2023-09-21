import { useEffect, useState } from 'react'
import Auth from '../../utils/Auth';
import { getReceivedLists } from '../../utils/api';


const ShareListIndex = () => {

    const [receivedListData, setReceivedListData] = useState({});
    const userId = Auth.getProfile().data?._id;

    const receivedListDataLength = Object.keys(receivedListData).length

    useEffect(() => {
        const findReceivedLists = async () => {
            const response = await getReceivedLists(userId);
            const receivedLists = await response.json();
            setReceivedListData(receivedLists.receivedLists)
            console.log(receivedListData);
        }
        findReceivedLists();
    }, [receivedListDataLength])

    return (
        <div>you have {receivedListData.length} shared lists</div>
    )
};

export default ShareListIndex;