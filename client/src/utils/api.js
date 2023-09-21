export const signup = (signupFormData) => {
    return fetch(`/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupFormData)
    });
}

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

export const getListCategories = async (listId) => {
    return fetch(`/api/user/lists/${listId}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const newList = (userId, listFormData) => {
    return fetch(`/api/user/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listFormData),
    });
    // window.location.href=`http://localhost:3000/home/${userId}`
};

export const addItem = (listId, newItemData) => {
    return fetch(`/api/user/lists/${listId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData)
    })
};

export const addItemWithCategory = (listId, newItemData) => {
    return fetch(`/api/user/lists/${listId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData)
    })
}

export const updateItem = (catId, updateItemData) => {
    return fetch(`/api/user/lists/${catId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updateItemData, catId })
    })
}

export const deleteItem = (itemId, listId, categoryId) => {
    return fetch(`/api/user/lists/${listId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, categoryId })
    });
};

export const deleteList = (userId, listId) => {
    return fetch(`/api/user/${userId}/lists`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listId })
    });
};

export const getUserChecklists = (userId) => {
    return fetch(`/api/checklist/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify(userId)
    });
};

export const createChecklist = (userId, checklistData) => {
    return fetch(`/api/checklist/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...checklistData, userId})
    });
};

export const getSingleChecklist = (userId, checklistId) => {
    return fetch(`/api/checklist/${userId}/${checklistId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
};

export const addTaskToCheckList = (userId, checklistId, taskData) => {
    return fetch(`/api/checklist/${userId}/add-task`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...taskData, checklistId })
    });
};

export const deleteTaskFromChecklist = (userId, checklistId, taskId) => {
    return fetch(`/api/checklist/${userId}/${checklistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId, checklistId })
    })
};

export const toggleItemCheck = (taskId) => {
    return fetch(`/api/checklist/check-task`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId })
    });
};

export const getReceivedLists = (recipientId) => {
    return fetch(`/api/share-lists/${recipientId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}