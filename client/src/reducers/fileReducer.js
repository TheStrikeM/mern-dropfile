const SET_FILES = "SET_FILES"
const SET_CURRENT_DIR = "SET_CURRENT_DIR"

const initialState = {
    files: [],
    currentDir: null
}

export default function(state = initialState, {type, payload}) {
    switch(type) {

        case SET_FILES:
            return {
                ...state,
                files: payload
            }

        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: payload
            }

        default:
            return state
    }
}

export const setFiles = (payload) => ({type: SET_FILES, payload: payload})
export const setDir = (payload) => ({type: SET_CURRENT_DIR, payload: payload})