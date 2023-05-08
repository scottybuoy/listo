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
    })
}