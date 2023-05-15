import Image from 'next/image'
import styles from './page.module.css'
import Header from './components/Header/header.js'
import Footer from './components/Footer/Footer'
import Cadastro_Form from './components/CadastroForm/Cadastro_Form'

export default function Home() {
  return (
    <main >
      {/* <Header/> */}

      <Cadastro_Form/>
      
      {/* <Footer/> */}
    </main>
  )
}