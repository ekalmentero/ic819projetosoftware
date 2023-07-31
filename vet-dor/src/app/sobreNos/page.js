import './sobreNos.css';

import Header from "../components/Header/header";
import Footer from "../components/Footer/Footer";

export default function SobreNos() {
	return(
		<div className="container">
			<Header/>
			<div className="main">
				<h1>Quem Somos</h1>
				<section>
					<h3>Vet D'or</h3>
					<p>
						Fundada em 2021, a Vet D'or tem como objetivo fornecer atendimento de excelência na cidade de Seropédica aos animais de estimação da região contribuindo para o bem estar e melhor qualidade de vida junto a seus tutores além de rápido diagnóstico em casos de emergência.
					</p>
				</section>

				<section>
					<h3>Missão:</h3>
					<p>
						Proporcionar o bem-estar fisico e saúde aos animais por meio de atendimento dedicado e humanizado, com o uso das ferramentas tecnológicas existentes e aperfeiçoamento constante da nossa equipe profissional, contribuindo com sua saúde e qualidade de vida equipe confiança e credibilidade por parte da família tutora.
					</p>
				</section>

				<section>
					<h3>Visão:</h3>
					<p>
						Ser reconhecida como a melhor clinica da região com prontuário eletrônico que proporciona assistência ao bem estar animal e que conecta diretamente os tutores aos medicos veterinários e mantém o histórico do animal armazenado digitalmente para agilizar o atendimento em casos de emergência.
					</p>
				</section>

				<section>
					<h3>Valores:</h3>
					<p>
						Eficiência : Aperfeiçoamos permanentemente os recursos disponíveis para a criação de valor em todas as atividades executadas. <br/>
						Inovação : Cultivamos uma cultura de inovação como garantia de nossa perenidade. <br/>
						Ética : Ética é inspiração e condição de nosso comportamento pessoal e institucional. <br/>
						Valorização da vida : Respeitar os animais, a si mesmo e aos outros, com consciência ambiental e consideração à natureza em todos os sentidos.
					</p>
				</section>
			</div>
			<Footer/>
		</div>
	)
}