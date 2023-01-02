import "./_footer.scss";

const Footer = () => {
	return (
		<>
			<div className="footer">
				<p>
					©{" "}
					<a
						href="https://github.com/Hugo-Latreille"
						target="_blank"
						rel="noopener noreferrer"
					>
						Hugo-Latreille
					</a>{" "}
					&{" "}
					<a
						href="https://github.com/MateoLDC"
						target="_blank"
						rel="noopener noreferrer"
					>
						MateoLDC
					</a>
				</p>
			</div>
		</>
	);
};

export default Footer;
