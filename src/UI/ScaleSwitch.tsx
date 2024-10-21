import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {changeScale} from "../store/weatherSlice.ts";

import "./scaleswitch.style.scss"
const ScaleSwitch = () => {
	const d = useAppDispatch()
	const unit = useAppSelector(state => state.weather.general.unit)
	return (
		<div className='switch'>
			<u>C</u> <span onClick={()=> d(changeScale())}><i className={unit === "C" ? "" : "on"}></i></span> <u>F</u>
		</div>
	);
}
export default ScaleSwitch;