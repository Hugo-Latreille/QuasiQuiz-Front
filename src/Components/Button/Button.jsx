import "./_button.scss";

const Button = ({ label, onClick }) => {
	return (
		<button onClick={onClick} className="btn">
			{label}
		</button>
	);
};
export default Button;
