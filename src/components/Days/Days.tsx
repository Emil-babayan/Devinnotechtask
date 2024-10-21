import {useAppSelector, useAppDispatch} from "../../store/store.ts";

import "./days.style.scss"
import Temperature from "../../UI/Temperature.tsx";
import {changeDay, changeCurrentData} from "../../store/weatherSlice.ts";

const Days = () => {

	const d = useAppDispatch()


	const {isLoading, isError, data} = useAppSelector(state => state.weather.daily)
	const {day: currentDay} = useAppSelector(state => state.weather.general)
	const chunkSize = 8
	const today = Date.now()
	const oneDay = 1000 * 60 * 60 * 24


	function chooseDay(slice) {
		return slice.reduce((acc, elem) => acc.temp > elem.temp ? acc : elem)
	}

	if (isLoading) return <h2>Loading...</h2>
	if (isError) return <h2>Something went wrong, try again in a few minutes</h2>

	return (
		<section>
			{new Array(5).fill(null).map((day, index) => {
				const dayString = new Date(today + index * oneDay).toLocaleString("en-US", {
					weekday: "long",
				})
				const piece = data.slice(index * chunkSize, (index + 1) * chunkSize)
				const {temp, icon, description} = chooseDay(piece)
						return <div onClick={()=> {
							d(changeDay(index))
							d(changeCurrentData({temp, icon, description}))
						}} className={"day" + (currentDay === index? " active": "")} key={dayString}>
					<h3>{dayString}</h3>
					<Temperature t={temp}/>
					<img draggable={false} src={icon} alt={description}/>
				</div>
			})}
		</section>
	);
}
export default Days;