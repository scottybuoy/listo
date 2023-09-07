// const createNotesObj = (listData) => {

//     if (!listData.categories) {

//         return;
//     }

//     let notesObj = {};

//     for (const category of listData.categories) {
     
//         for (let i = 0; i < category.items.length; i++) {
//             console.log('yo', category.items[i].itemName)
//             notesObj[category.items[i]._id] = { notesOpen: false }
//         }

//     }

//     return notesObj;
    
// }

// export const notesObjPromise = new Promise((resolve, reject) => {
//     resolve(createNotesObj);
//     reject('Error');
// })