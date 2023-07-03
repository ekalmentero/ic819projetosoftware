import {initializeApp} from "firebase/app"

// Aqui definimos nossa configuração do Database, os dados específicos da nossa aplicação
const firebaseConfig = {
  apiKey: "AIzaSyDsl7eSJqzJKJHuvVAeeNv0ViEqaFdWArE",
  authDomain: "projetovet-dor.firebaseapp.com",
  databaseURL: "https://projetovet-dor-default-rtdb.firebaseio.com",
  projectId: "projetovet-dor",
  storageBucket: "projetovet-dor.appspot.com",
  messagingSenderId: "29753413611",
  appId: "1:29753413611:web:8dc26b46050d1f106653ae"
};


// inicilaizamos uma instância do firebase na nossa aplicação com os dados que nos definimos no firebaseConfigl;
const app = initializeApp(firebaseConfig);
// importamos a função getDatabase que vai ser a responsável por pegar as informações do nosso banco de dados;
import {getDatabase} from 'firebase/database';
export const database = getDatabase(app);

