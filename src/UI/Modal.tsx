import "./modal.style.scss"

type ModalProps = {
	off: () => void
}

const Modal = ({off}:ModalProps) => {


	return (
		<div className="modal">
			<div className="modalcontent">
				<h2>NO SUCH CITY!</h2>
				<button onClick={off}>ok :(</button>
			</div>

		</div>
	);
}
export default Modal;