import "./curentweather.style.scss"
import {useAppSelector} from "../../store/store.ts";
import Temperature from "../../UI/Temperature.tsx";

const CurrentWeather = (props) => {

	const {isLoading, isError, data} = useAppSelector(state => state.weather.current)
	const {name} = useAppSelector(state => state.weather.general)
	if (isLoading) return <h2>Loading...</h2>
	if (isError) return <h2>Something went wrong, try again in a few minutes</h2>
	const {temp, icon, description} = data
	return (
		<article>

			<h2>{name}</h2>
			<p className="temp">
				<Temperature t={temp}/>
			</p>
			<img draggable={false} src={icon} alt={description}/>
			<p className="desc">{description}</p>

		</article>
	);
}
export default CurrentWeather;