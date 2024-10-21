import "./temperature.style.scss"
import {useAppSelector} from "../store/store.ts";

const Temperature = ({t}: number) => {

	const unit = useAppSelector(state => state.weather.general.unit)
	const temperature = unit == "C" ? t : t * 9 / 5 + 32
	return (
		<b>{temperature.toFixed(1)}<sup>o</sup>{unit}</b>
	);
}
export default Temperature;