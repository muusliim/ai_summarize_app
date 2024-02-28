import { logo } from "../assets";

const Hero = () => {
	return (
		<header className="w-full flex justify-center items-center flex-col">
			<nav className="flex justify-between items-center w-full mb-10 pt-3">
				<img src={logo} alt="logo" className="w-28 h-12 object-contain" />
				<button
					type="button"
					onClick={() => window.open("https://github.com/muusliim")}
					className="black_btn"
				>
					GitHub
				</button>
			</nav>

			<h1 className="head_text">
				Резюмируйте статьи с помощью <br className="max-md:hidden" />{" "}
				<span className="orange_gradient">OpenAI GPT-4</span>
			</h1>
			<h2 className="desc">
				Упростите чтение с помощью Summarize - обобщающего редактора статей с
				открытым исходным кодом, который превращает объемные статьи в четкие и
				лаконичные резюме.
			</h2>
		</header>
	);
};

export default Hero;
