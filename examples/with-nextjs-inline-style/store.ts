import { configureStore, Action } from '@reduxjs/toolkit'
import 'redux-thunk/extend-redux'

import rootReducer, { RootState } from './slices'


const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch

export type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export default store
