export const login = (userData) => {
    return fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
};

export const getUserLists = (userId) => {
    return fetch(`/api/user/${userId}/lists`, {
        headers: {
            'Content-Type': 'application/json',
          },
    });
};

export const getSingleList = (userId, listId) => {
    return fetch(`/api/user/${userId}/list/${listId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const newList = (userId, listFormData) => {
    fetch(`/api/user/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listFormData),
    });
    window.location.href=`http://localhost:3000/home/${userId}`
};

export const deleteItem = (itemId, listId) => {
    return fetch(`/api/user/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId})
    });
};