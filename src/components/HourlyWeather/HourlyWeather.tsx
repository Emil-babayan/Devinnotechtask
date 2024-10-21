import "./hourlyweather.style.scss"
import {useAppSelector} from "../../store/store.ts";
import Temperature from "../../UI/Temperature.tsx";

const HourlyWeather = () => {

	const {isLoading, isError, data} = useAppSelector(state => state.weather.daily)
	const day = useAppSelector(state => state.weather.general.day)

	const chunkSize = 8, start = day * chunkSize, end = (day+1) * chunkSize
	if (isLoading) return <h2>Loading...</h2>
	if (isError) return <h2>Something went wrong, try again in a few minutes</h2>
	const singleDayHours = data.slice(start, end)
	return (
		<article>
			{singleDayHours.map(({temp, icon, dt_txt, description}) => <div className="hour" key={dt_txt}>
				<p>{dt_txt.slice(-8)} </p> <Temperature t={temp}/>
					<img draggable={false} src={icon} alt={description}/>
			</div>)}
		</article>
	);
}
export default HourlyWeather;