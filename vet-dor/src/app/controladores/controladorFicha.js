const { database } = require('../db/db');
const { ref, getDownloadURL, uploadBytesResumable } = require("@firebase/storage");
const validations = require("./../validacoes/index")

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function storeFile(req, res) {
	console.log(`[/storeFile]`);

	try {
		const {
			idAnimal,
			tipoArquivo, 
			texto, 
			data 
		} = req.body;

		const TypeFileLimpo = DOMPurify.sanitize(tipoArquivo);
		const textLimpo = DOMPurify.sanitize(texto);
		const dateLimpo = DOMPurify.sanitize(data);
		const idAnimalLimpo = DOMPurify.sanitize(idAnimal);

		if (textLimpo.length == 0 ) {
			console.log("[/storeFile] texto vazio");

			res.status(400).send({
				code: "TEXTO_VAZIO",
				message: "texto enviado está vazio",
				result: null
			})
			return;
		}

		if (dateLimpo.length == 0 ) { 
			console.log("[/storeFile] Data vazia vazia");

			res.status(400).send({
				code: "DATA_VAZIO",
				message: "data enviada está vazia",
				result: null
			})
			return;
		}

		if (TypeFileLimpo.length == null ) {
			console.log("[/storeFile] não foi escolhido tipo de arquivo ");

			res.status(400).send({
				code: "ARQUIVO_INDETERMINADO",
				message: "tipo de arquivo não determinado",
				result: null
			})
			return;
		}
		if (!validations.cpfValidation(idAnimalLimpo)) {
			console.log("[/storeFile] não foi enviado o id do paciente ");

			res.status(400).send({
				code: "ID_PACIENTE_INDERTERMINADO",
				message: "id do paciente não determinado",
				result: null
			})
			return;
		}

		console.log("tudo verificado");

		const dbData = {
			idAnimal: idAnimalLimpo,
			tipoArquivo: TypeFileLimpo,
			textConsulta: textLimpo,
			textDate: dateLimpo
		}
		const text = {
			texto: textLimpo,
		}

		//! Criar o texto da consulta no banco de dados, Falta definir o nome de coleção.
		// Definir como Vamos dividir cada coleção: Diagnóstico, Receita, Observações
		const textSend = await database.collection('animals').doc(dbData.idAnimal).collection(dbData.tipoArquivo).doc(dbData.textDate).set(text);

		console.log(`[/storeFile] textSend =${textSend}`);
		console.log(`[/storeFile] sucesso`);

		res.status(200).send({
			code: "OK",
      message: "Ficha enviada",
      result: textSend
		});
	}
	catch(error) {
		console.log(`/storeFile error = ${error}`);
		res.status(500).send({
			code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
		})
	}
}

async	function recuperarFicha(req, res) {
	console.log("recuperar Ficha");

	try {
		const {
			idAnimal,
			tipoArquivo, 
			data 
		} = req.body;
		console.log(JSON.stringify(req.body));

		const idAnimalLimpo = DOMPurify.sanitize(idAnimal);
		const tipoArquivoLimpo = DOMPurify.sanitize(tipoArquivo);
		const dataLimpo = DOMPurify.sanitize(data)

		if (!validations.cpfValidation(idAnimalLimpo)) {
			console.log("[/RecuperarFicha] não foi enviado o id do paciente ");

			res.status(400).send({
				code: "ID_PACIENTE_INDERTERMINADO",
				message: "id do paciente não determinado",
				result: null
			})
			return;
		}

		if (tipoArquivoLimpo.length == 0 || tipoArquivoLimpo.length == null ) {
			console.log("[/RecuperarFicha] tipo de arquivo não determinado ");

			res.status(400).send({
				code: "ARQUIVO_INDERTERMINADO",
				message: "tipo de arquivo não determinado",
				result: null
			})
			return;
		}
		
		if (dataLimpo.length == 0 || dataLimpo.length == null ) {
			console.log("[/RecuperarFicha] tipo de arquivo não determinado ");

			res.status(400).send({
				code: "ARQUIVO_INDERTERMINADO",
				message: "tipo de arquivo não determinado",
				result: null
			})
			return;
		}
		
		console.log("[firebase.getFile]");
		const fileRef = database.collection("animals").doc(idAnimalLimpo).collection(tipoArquivoLimpo).doc(dataLimpo);
		const doc1 = await fileRef.get();
		const aniInfo = database.collection("animals").doc(idAnimalLimpo);
		const doc = await aniInfo.get();

		const getAniInfo = doc.data();
		const getAniFile = doc1.data();
		console.log(`firebase Data (info) = ${JSON.stringify(getAniInfo)}`);
		console.log(`firebase Data (file)= ${JSON.stringify(getAniFile)}`);


		if (!doc.exists || !doc1.exists ) {
			res.status(404).send({   
				code: "NOT_FOUND",
				message: "Não existe esse documento salvo",
				result: null
			});
			return;
		}
		
		res.status(200).send({
			code: "OK",
			message: "Arquivo Recuperado",
			result: {
				getAniInfo,
				getAniFile
			}
		});
		
		} catch (error) {
			console.log(`ERROR: ${error}`);
			res.status(500).send({
			code: "INTERNAL_ERROR",
      message: "erro inesperado",
			result: error,
		});
	}
}

module.exports = {
	storeFile,
	recuperarFicha
}