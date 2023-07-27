const { database } = require('../db/db');
const { ref, getDownloadURL, uploadBytesResumable } = require("@firebase/storage");

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

async function storeFile(req, res) {
	console.log(`[/storeFile]`);

	try {
		const {
			tipoArquivo, 
			texto, 
			data 
		} = req.body;

		const TypeFileLimpo = DOMPurify.sanitize(tipoArquivo);
		const textLimpo = DOMPurify.sanitize(texto);
		const dateLimpo = DOMPurify.sanitize(data);

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

	console.log("tudo verificado");

	const dbData = {
		tipoArquivo: TypeFileLimpo,
		textConsulta: textLimpo,
		textDate: dateLimpo
	}


		//! Criar o texto da consulta no banco de dados, Falta definir o nome de coleção.
		// Definir como Vamos dividir cada coleção: Diagnóstico, Receita, Observações
		const textSend = await database.collection(dbData.tipoArquivo).doc(dbData.textDate).set(dbData);

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

	
	// const files = req.files;
	// console.log(`files = ${files}`);

	// const pdfFile = files?.[0];

// 	if(!pdfFile) {
// 		console.log(`[/storeFile] pdfFile = nenhum arquivo selecionado`);
// 		console.log(`pdfFile = ${pdfFile}`);
		
// 		res.status(400).send({
// 			code: "PDF_INVALIDO",
// 			message: "pdf inválido",
// 			result: null
// 		});
// 		return;
// 	}
	
// 	if (!body ) {
		
// 	}

// 	const storageRef = ref(database, `files/${pdfFile.name}`);
// 	const sendPdf = uploadBytesResumable(storageRef, pdfFile);

// 	sendPdf.on("state_changed", (error) => {
// 		console.log(`[/storeFile] error = ${error}`);
//     res.status(500).send({
//       code: "ERRO_INESPERADO",
//       message: "Um erro inesperado aconteceu.",
//       result: error,
//     });
// 	},
// 	() => {
// 			getDownloadURL(sendPdf.snapshot.ref).then((url) => {
// 				// setUrl(url);
// 				console.log(`pdfEnviado url = ${url}`);
// 				res.status(200).send({
// 					code: "OK",
// 					message: "PDF Enviado",
// 					result: url
// 				});
// 			});
// 		}
// 	);
// }

module.exports = {
	storeFile
}