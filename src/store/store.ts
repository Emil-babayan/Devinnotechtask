import {configureStore, createListenerMiddleware} from "@reduxjs/toolkit";
import {useSelector, useDispatch, TypedUseSelectorHook} from "react-redux";
import weatherSliceReducer from "./weatherSlice.ts";
import {getCurrentWeather, getHourlyWeather} from "./weatherSlice.ts";

const listenerMiddleware = createListenerMiddleware();
const store = configureStore({
	reducer: {
		weather: weatherSliceReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
})


listenerMiddleware.startListening({
	type: "init",
	effect:(_, listenerApi)=> {
		navigator.geolocation.getCurrentPosition(({coords: {latitude: lat, longitude: lon}})=> {
			listenerApi.dispatch(getCurrentWeather({lat, lon}))
			listenerApi.dispatch(getHourlyWeather({lat, lon}))
		}, ()=> {

			listenerApi.dispatch(getCurrentWeather({lat: 51.51, lon: 0.12}))
			listenerApi.dispatch(getHourlyWeather({lat: 51.51, lon: 0.12}))
		}, {enableHighAccuracy: true})
	}
})

store.dispatch({
	type: "init"
})


type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store