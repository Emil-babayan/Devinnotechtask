import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"

type Coordinates = {
	lat: number
	lon: number
}

type WeatherData = {
	temp: number
	description: string
	icon: string
}

type State = {
	current: {
		isLoading: boolean,
		isError: boolean,
		data: null | WeatherData,
	}
	daily: {
		isLoading: boolean,
		isError: boolean,
		data: null | WeatherData,
	}
	general: {
		unit: `${C}` | `${F}`,
		name: string,
		day: number
	}
}

const initialState: State = {
	current: {
		isLoading: true,
		isError: false,
		data: null,

	},
	daily: {
		isLoading: true,
		isError: false,
		data: null,
	},
	general: {
		unit: "C",
		name: "",
		day: 0
	}

}

export const getCurrentWeather = createAsyncThunk("currentData/get", async (coords: Coordinates) => {
	const {lat, lon} = coords
	try {
		const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
		return await res.json()
	} catch (err) {
		throw new Error("Bad things happened")
	}
})

export const getHourlyWeather = createAsyncThunk("hourlyData/get", async (coords: Coordinates) => {
	const {lat, lon} = coords
	try {
		const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`)
		return await res.json()
	} catch (err) {
		throw new Error("Bad things happened")
	}
})

const weatherSlice = createSlice({
	name: "weatherData",
	initialState,
	reducers: {
		changeDay: (state, {payload}) => {
			state.general.day = payload
		},
		changeScale: (state) => {
			state.general.unit = (state.general.unit === "C"? "F" : "C")
		},
		changeCurrentData: (state, {payload}) => {
			state.current.data = payload
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getCurrentWeather.fulfilled, (state, {payload}) => {
						state.current.isError = false
						state.current.isLoading = false
						const data = {}
						data.temp = payload.main.temp
						data.description = payload.weather[0].main
						data.icon = `https://openweathermap.org/img/wn/${payload.weather[0].icon}@2x.png`
						state.current.data = data as WeatherData
						state.general.name = payload.name
					})
		builder.addCase(getCurrentWeather.pending, ()=> {

		})
		builder.addCase(getCurrentWeather.rejected, ()=> {

		})
		builder.addCase(getHourlyWeather.fulfilled, (state, {payload: {list}})=> {
			const dailyData = list.map(day => {
				const {dt, dt_txt} = day
				const singleDay = {...dt, dt_txt}
				singleDay.temp = day.main.temp
				singleDay.icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
				singleDay.description = day.weather[0].main
				return singleDay
			})
			state.daily.isLoading = false
			state.daily.isError = false
			state.daily.data = dailyData

		})
		builder.addCase(getHourlyWeather.pending, ()=> {

		})
		builder.addCase(getHourlyWeather.rejected, ()=> {

		})
	}


})

export default weatherSlice.reducer
export const {changeDay, changeScale, changeCurrentData} = weatherSlice.actions