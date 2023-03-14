import { configureStore } from '@reduxjs/toolkit'

import userSlice from './slices/user-slice'
import articlesSlice from './slices/articles-slice'
import statusSlice from './slices/status-slice'
import tagsSlice from './slices/tags-slice'

const store = configureStore({
  reducer: {
    user: userSlice,
    articles: articlesSlice,
    status: statusSlice,
    tags: tagsSlice,
  },
})

export default store