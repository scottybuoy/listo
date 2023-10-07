import './searchListModal.css';

const SearchListsModal = ({ lists }) => {
    const foundLists = lists.userLists;
    console.log('FOUND LISTS', foundLists);
    return (
        <div className='search-lists-modal-cont'>
            {foundLists.length && foundLists.map((list) => (
                <div key={list._id}>{list.listTitle}</div>
            ))}
        </div>
    )
}

export default SearchListsModal;