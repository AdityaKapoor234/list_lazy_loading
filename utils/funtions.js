import ApiList from "../service/api-list";

export async function getListFunction(id, page, limit) {
    try {
        const response = await ApiList.getApiList(id, page, limit);
        const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
        return response.data.map(list => ({
            ...list,
            favorite: favorites.some(item => item.id === list.id)
        }));
    } catch (error) {
        toast.error("Unable to process your request, please try after sometime");
        return [];
    }
};

export function addToFavorites(listItem, oldList, favoritePage) {

    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (listItem.favorite === true) {
        favorites = favorites.filter((elem) => elem.id !== listItem.id);
    } else {
        favorites.push(listItem);
    }

    listItem.favorite = !listItem.favorite;

    if (favorites.length > 0) {
        // Add List Item To Favourites
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        // Remove From Favourite List
        localStorage.removeItem('favorites');
    }


    if (favoritePage === true) {
        const newList = oldList.map((elem) =>
            elem.id === listItem.id ? { ...elem, favorite: listItem.favorite } : elem
        );
        return newList.filter((elem) => elem.favorite === true);
    } else {
        return oldList.map((elem) =>
            elem.id === listItem.id ? { ...elem, favorite: listItem.favorite } : elem
        );
    }

}

