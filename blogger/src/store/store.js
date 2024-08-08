import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        // Define your reducers here
    },
    // Other store enhancers if needed
})

export default store;