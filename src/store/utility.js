export const updateObject = (state, updatedState) => {
    return {
        ...state,
        ...updatedState
    }
}