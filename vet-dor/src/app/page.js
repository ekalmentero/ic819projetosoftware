import Image from 'next/image'
import styles from './page.module.css'
import Header from './components/Header/header.js'
import Footer from './components/Footer/Footer'
import Cadastro_Form from './components/CadastroForm/Cadastro_Form'
import AniProfile from './components/AniProfile/AniProfile'
import Readdata from './rotas/Readdata'
import Login_Form from './components/LoginForm/Login_Form'

export default function Home() {
  return (
    <main >
      {/* <Header/> */}

      {/* <Cadastro_Form/> */}
      
      <Login_Form/>
      
      {/* <Readdata/> */}

      {/* <AniProfile/> */}
      
      {/* <Footer/> */}
    </main>
  )
}