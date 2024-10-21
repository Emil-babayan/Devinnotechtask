import {useAppSelector} from "./store/store.ts";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather.tsx";
import HourlyWeather from "./components/HourlyWeather/HourlyWeather.tsx";
import Days from "./components/Days/Days.tsx";
import CitySearch from "./components/CitySearch/CitySearch.tsx";

const App = () => {

	return (
		<main>
			<CitySearch/>
			<CurrentWeather/>
			<HourlyWeather/>
			<Days/>
		</main>
	);
}
export default App;