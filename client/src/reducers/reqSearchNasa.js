/* eslint-disable no-case-declarations */
import {
    REQUEST_LIKE_FRONT,
    REQUEST_ADD_FRONT,
    REQUEST_EDIT_FORM,
    REQUEST_CANCEL_EDIT,
    REQUEST_EDIT_FRONT,
    REQUEST_DELETE_FRONT,
    REQUEST_FILTER_FAVOURITE_FRONT,
    REQUEST_CANCEL_FILTER_FAVOURITE,
    REQUEST_SORT_DATE_FRONT,

    REQUEST_SEARCH_NASA,
    REQUEST_SEARCH_NASA_SUCCESS,
    REQUEST_SEARCH_NASA_FAIL,
    REQUEST_CANCEL_SORT_DATE,
} from '../actions/nasa/actionTypes';

export let defaultData = {}
const initialState = {
    loading: false,
    error: '',
    data: [],
    isLoaded: true
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REQUEST_SEARCH_NASA:
            return {
                ...state,
                loading: true,
                isLoaded: false
            }
        case REQUEST_SORT_DATE_FRONT:
            const sortData = state.data;
            const newSortData = sortData.sort((a, b) => {
                return new Date(a.data.date_created) - new Date(b.data.date_created)
            })
            return {
                ...state,
                loading: false,
                data: newSortData,
                isLoaded: true,
                isSortedByDate: true,
            }
        case REQUEST_CANCEL_SORT_DATE:
            const sortReverseData = state.data;
            const newSortReverseData = sortReverseData.sort((a, b) => {
                return new Date(b.data.date_created) - new Date(a.data.date_created)
            })
            return {
                ...state,
                loading: false,
                data: newSortReverseData,
                isLoaded: true,
                isSortedByDate: false,
            }
        case REQUEST_FILTER_FAVOURITE_FRONT:
            const filterFavouriteData = state.data;
            const newFavouriteData = filterFavouriteData.filter(item => item.data.isLiked === true);

            return {
                ...state,
                loading: false,
                data: newFavouriteData,
                isLoaded: true,
                isFilteredByFavourite: true,
            }
        case REQUEST_CANCEL_FILTER_FAVOURITE:
            const beforeFilterByFavouriteData = action.params;
            return {
                ...state,
                loading: false,
                data: beforeFilterByFavouriteData,
                isLoaded: true,
                isFilteredByFavourite: false,
            }
        case REQUEST_DELETE_FRONT:
            const paramsDeleteId = action.params;
            const deleteData = state.data;
            const newDeleteData = deleteData.filter(item => item.data.nasa_id !== paramsDeleteId)
            return {
                ...state,
                loading: false,
                data: newDeleteData,
                isLoaded: true
            }
        case REQUEST_EDIT_FORM:
            const paramsEditFormId = action.params;
            const editFormData = state.data;
            const newEditFormData = editFormData.map(item => {
                const itemData = item.data
                if (itemData.nasa_id === paramsEditFormId) {
                    itemData.isEditting = true;
                }
                return item;
            })
            return {
                ...state,
                loading: false,
                data: newEditFormData,
                isLoaded: true
            }
        case REQUEST_CANCEL_EDIT:
            const paramsCancelEditId = action.params;
            const cancelEditData = state.data;
            const newCancelEditData = cancelEditData.map(item => {
                const itemData = item.data
                if (itemData.nasa_id === paramsCancelEditId) {
                    itemData.isEditting = false
                }
                return item;
            })
            return {
                ...state,
                loading: false,
                data: newCancelEditData,
                isLoaded: true
            }
        case REQUEST_EDIT_FRONT:
            const paramsUpdateData = action.params;
            const itemUpdateData = {
                data: {
                    center: '',
                    date_created: new Date(),
                    description: paramsUpdateData.description,
                    keywords: [paramsUpdateData.title],
                    media_type: 'image',
                    nasa_id: paramsUpdateData.nasaId,
                    title: paramsUpdateData.title
                },
                media: paramsUpdateData.href
            }
            const updateData = state.data;
            const newUpdateData = updateData.map(item => {
                if (item.data.nasa_id === paramsUpdateData.nasaId) {
                    item = itemUpdateData
                }
                return item;
            })
            return {
                ...state,
                loading: false,
                data: newUpdateData,
                isLoaded: true
            }
        case REQUEST_ADD_FRONT:
            const paramsAddItem = action.params;
            const itemAddData = {
                data: {
                    center: '',
                    date_created: new Date(),
                    description: paramsAddItem.description,
                    keywords: [paramsAddItem.title],
                    media_type: 'image',
                    nasa_id: paramsAddItem.nasaId,
                    title: paramsAddItem.title
                },
                media: paramsAddItem.href
            }
            const newItemData = [itemAddData, ...state.data]
            return {
                ...state,
                loading: false,
                data: newItemData,
                isLoaded: true
            }
        case REQUEST_LIKE_FRONT:
            const paramsId = action.params;
            const { data } = state;
            const newLikeData = data.map(item => {
                const itemData = item.data
                if (itemData.nasa_id === paramsId) {
                    itemData.isLiked = !itemData.isLiked
                }
                return item;
            })
            return {
                ...state,
                loading: false,
                data: newLikeData,
                isLoaded: true
            }
        case REQUEST_SEARCH_NASA_SUCCESS:
            defaultData = action && action.payload;
            return {
                ...state,
                loading: false,
                data: defaultData,
                isLoaded: true
            }
        case REQUEST_SEARCH_NASA_FAIL:
            return {
                ...state,
                loading: false,
                error: action,
                isLoaded: true
            }
        default:
            return state;
    }
}