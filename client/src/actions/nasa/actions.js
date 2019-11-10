import {
    REQUEST_LIKE_FRONT,
    REQUEST_ADD_FRONT,
    REQUEST_EDIT_FORM,
    REQUEST_CANCEL_EDIT,
    REQUEST_EDIT_FRONT,
    REQUEST_DELETE_FRONT,
    
    REQUEST_FILTER_TYPE,

    REQUEST_FILTER_DATE_FRONT,
    REQUEST_CANCEL_FILTER_DATE,

    REQUEST_FILTER_FAVOURITE_FRONT,
    REQUEST_CANCEL_FILTER_FAVOURITE,

    REQUEST_SORT_TITLE_FRONT,
    REQUEST_CANCEL_SORT_TITLE,

    REQUEST_SORT_DATE_FRONT,
    REQUEST_SORT_DESC_DATE_FRONT,
    REQUEST_CANCEL_SORT_DATE,
    
    REQUEST_PAGINATION_FRONT,

    REQUEST_SEARCH_NASA,
    REQUEST_SEARCH_NASA_SUCCESS,
    REQUEST_SEARCH_NASA_FAIL,
} from './actionTypes';

// *********************************************************
// REQUEST ADD FRONT
// *********************************************************
export const reqLikeFront = (params) => {
    return {
        type: REQUEST_LIKE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST ADD FRONT
// *********************************************************
export const reqAddFront = (params) => {
    return {
        type: REQUEST_ADD_FRONT,
        params
    }
}
// *********************************************************
// REQUEST EDIT FORM
// *********************************************************
export const reqEditForm = (params) => {
    return {
        type: REQUEST_EDIT_FORM,
        params
    }
}
// *********************************************************
// REQUEST CENCEL EDIT
// *********************************************************
export const reqCancelEdit = (params) => {
    return {
        type: REQUEST_CANCEL_EDIT,
        params
    }
}
// *********************************************************
// REQUEST EDIT FRONT
// *********************************************************
export const reqEditFront = (params) => {
    return {
        type: REQUEST_EDIT_FRONT,
        params
    }
}
// *********************************************************
// REQUEST DELETE FRONT
// *********************************************************
export const reqDeleteFront = (params) => {
    return {
        type: REQUEST_DELETE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST FILTER TYPE FRONT
// *********************************************************
export const reqFilterType = (params) => {
    return {
        type: REQUEST_FILTER_TYPE,
        params
    }
}
// *********************************************************
// REQUEST FILTER DATE FRONT
// *********************************************************
export const reqFilterDateFront = (params) => {
    return {
        type: REQUEST_FILTER_DATE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST CANCEL FILTER DATE
// *********************************************************
export const reqCancelFilterDate = (params) => {
    return {
        type: REQUEST_CANCEL_FILTER_DATE,
        params
    }
}
// *********************************************************
// REQUEST FILTER FAVOURITE FRONT
// *********************************************************
export const reqFilterFavouriteFront = (params) => {
    return {
        type: REQUEST_FILTER_FAVOURITE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST CANCEL FILTER FAVOURITE
// *********************************************************
export const reqCancelFilterFavourite = (params) => {
    return {
        type: REQUEST_CANCEL_FILTER_FAVOURITE,
        params
    }
}
// *********************************************************
// REQUEST SORT TITLE FRONT
// *********************************************************
export const reqSortTitleFront = (params) => {
    return {
        type: REQUEST_SORT_TITLE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST CANCEL SORT TITLE
// *********************************************************
export const reqCancelSortTitle = (params) => {
    return {
        type: REQUEST_CANCEL_SORT_TITLE,
        params
    }
}
// *********************************************************
// REQUEST SORT DATE FRONT
// *********************************************************
export const reqSortDateFront = (params) => {
    return {
        type: REQUEST_SORT_DATE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST SORT DATE DESC FRONT
// *********************************************************
export const reqSortDescDateFront = (params) => {
    return {
        type: REQUEST_SORT_DESC_DATE_FRONT,
        params
    }
}
// *********************************************************
// REQUEST CANCEL SORT DATE
// *********************************************************
export const reqCancelSortDate = (params) => {
    return {
        type: REQUEST_CANCEL_SORT_DATE,
        params
    }
}
// *********************************************************
// REQUEST PAGINATION FRONT
// *********************************************************
export const reqPaginationFront = (params) => {
    return {
        type: REQUEST_PAGINATION_FRONT,
        params
    }
}

// *********************************************************
// REQUEST SEARCH NASA
// *********************************************************
export const reqSearchNasa = (params) => {
    return {
        type: REQUEST_SEARCH_NASA,
        params
    }
}
export const reqSearchNasaSuccess = (data) => {
    return {
        type: REQUEST_SEARCH_NASA_SUCCESS,
        payload: data
    }
}
export const reqSearchNasaFail = (error) => ({
    type: REQUEST_SEARCH_NASA_FAIL,
    payload: error
})