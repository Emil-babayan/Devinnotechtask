import "./citysearch.style.scss"
import {useAppDispatch} from "../../store/store.ts";
import {getHourlyWeather, getCurrentWeather} from "../../store/weatherSlice.ts";
import ScaleSwitch from "../../UI/ScaleSwitch.tsx";
import Modal from "../../UI/Modal.tsx";
import {useState} from "react";
import {createPortal} from "react-dom";




const CitySearch = () => {

	const [showModal, setShoowModal] = useState(false)


	const d = useAppDispatch()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e.target.city.value}&appid=${import.meta.env.VITE_API_KEY}`)
		const data = await response.json()
		if(!data.length) {
			setShoowModal(true)
		}
		const {lat, lon} = data[0]
		d(getCurrentWeather({lat, lon}))
		d(getHourlyWeather({lat, lon}))


	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input type="text" name="city"/>
				<input type="submit" value="Search City"/>
				<ScaleSwitch/>
			</form>
			{showModal && createPortal(<Modal off={()=> setShoowModal(false)}/>, document.body)}
		</>
	);
}
export default CitySearch;