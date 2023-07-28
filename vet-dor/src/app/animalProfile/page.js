import { MinusCircle } from "react-feather";
import "./AniProfile.css";
const Pic = "/assets/Pic.png"

import { UsuarioContext } from '../../../contexts/usuarioContext';

export default function AniProfile() {
  const { cpfUsuario, setCpfUsuario } = useContext(UsuarioContext);

  return(
    <div className="page_flex">
      <div className="AniProfile_flex" >
        <div className="Title_flex" >
          <h1>Perfil do meu PET</h1>
          <MinusCircle/>
        </div>

        <div className="Profile_pic" >
          <img width="150px" src={Pic}/>
          <h2>Caramelinho</h2>
        </div>

        <div className="Profile_data">
          <label for="name" >Idade</label>
          <input id="name" value="5 anos" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Data de Nascimento</label>
          <input id="name" value="20/03/2018" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Raça</label>
          <input id="name" value="Vira-lata Caramelo" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Sexo</label>
          <input id="name" value="Macho" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Nome do Responsável</label>
          <input id="name" value="Marcos Castro" name="name" placeholder="Seu nome" type="text"/>

          <label for="name" >Especie</label>
          <input id="name" value="Cachorro" name="name" placeholder="Seu nome" type="text"/>

          <button className="submit_trad" type="submit"> Dados de Consultas </button>
        </div>
      </div>
    </div>
  );
}