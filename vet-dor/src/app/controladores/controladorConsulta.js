const { database } = require('./../db/db');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const validations = require('../validacoes');
const { getUserByCpf } = require('./controladorUsuario');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// helper
function getDateTimeFormat(date, time) {
	// criar um padrão pra data e hora

	console.log(`date.toString() = ${date.toString()}`);
	console.log(`time.toString() = ${time.toString()}`);

	const dateTimeFormat = date.toString() + ":" + time.toString();

	console.log(`dateTime = ${dateTimeFormat}`);

	return dateTimeFormat;
}

// model function
async function getAppointmentByDateAndTime(dateTime) {
	console.log(`[getAppointmentByDateAndTime]`);
  
  const appointmentRef = await database.collection('appointments').doc(dateTime);
  const doc = await appointmentRef.get();
  
	// se não há um usuário cadastrado com o cpf, retorna false
  if(!doc.exists) {
		console.log('[getAppointmentByDateAndTime] consulta não encontrada');
    return false;
  }

  // se há um usuário cadastrado com o cpf, retorna os dados do usuário
	console.log(`[getAppointmentByDateAndTime] consulta encontrada`);
	return doc.data();
}

// model function 
async function getAllDbAppointments() {
	const appointmentsRef = db.collection('appoitments');
	const snapshot = await appointmentsRef.get();

	if(snapshot.length === 0) {
		return false
	}
	
	return snapshot;
}

async function getAllAppointments(req, res) {
	try {
		const appointments = await getAllDbAppointments();

		res.status(200).send({
			code: 'OK',
			message: 'sucesso',
			result: appointments
		})

		return appointments;
		
	} catch (error) {
		console.log(`[getAllAppointments] error = ${error}`);
		res.status(500).send({
			code: "ERRO_INESPERADO",
			message: "Um erro inesperado aconteceu.",
			result: error,
		});
	}
}

/*
	pegar os dados necessários
	sanitizar
	validar
	verificar no bd se já tem uma consulta marcada no horário
	marcar consulta
*/
async function scheduleAppointment(req, res) {
	console.log(`[scheduleAppointment]`);

	try {
		const {
			nomeUsuario,
			cpfUsuario,
			dataConsulta,
			horaConsulta
		} = req.body;

		// sanitizar
		const nomeLimpo = DOMPurify.sanitize(nomeUsuario);
		const cpfLimpo = DOMPurify.sanitize(cpfUsuario);
		const dataLimpo = DOMPurify.sanitize(dataConsulta);
		const horaLimpo = DOMPurify.sanitize(horaConsulta);	

		// validar
		if(!validations.nameValidation(nomeLimpo)) {
      console.log('[/createUser] nome inválido');

      res.status(400).send({
        code: "NOME_INVALIDO",
        message: "nome inválido",
        result: null
      });
      return;
		}

		if(!validations.cpfValidation(cpfLimpo)) {
			console.log('[/getUser] cpf inválido');

      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
		}

		const now = new Date();
		if(!dataLimpo || dataLimpo === null || dataLimpo === '' || dataLimpo < now) {
			console.log('[scheduleAppointment] data inválida');

			res.status(400).send({
				code: "DATA_INVALIDA",
				message: "data inválida",
				result: null
			});
			return;
		}
		
		if(!horaLimpo || horaLimpo === null || horaLimpo === '') {
			console.log('[scheduleAppointment] hora inválida');

			res.status(400).send({
				code: "HORA_INVALIDA",
				message: "hora inválida",
				result: null
			});
			return;
		}

		// formatar o dia e horário da consulta
		const dateTime = getDateTimeFormat(dataLimpo, horaLimpo);

		// verificar no BD se já existe uma consulta marcada no horário
		const dbResult = await getAppointmentByDateAndTime(dateTime);

		if(dbResult !== false) {
			console.log('[scheduleAppointment] conflito de horário de consulta');

			res.status(400).send({
				code: "CONFLITO_HORARIO_CONSULTA",
				message: "já existe uma consulta marcada neste dia e horário",
				result: null
			});
			return;
		}
 
		const dbData = {
			ownerCpf: cpfLimpo,
			ownerName: nomeLimpo,
			date: dataLimpo,
			time: horaLimpo
		}

    console.log(`[scheduleAppointment] dbData = ${dbData}`);

		const appointmentRef = await database.collection('appointments').doc(dbData.dateTime).set(dbData);

		res.status(200).send({
			code: "OK",
			message: "consulta marcada",
			result: appointmentRef
		});

	} catch (error) {
		console.log(`[scheduleAppointment] error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
	}
}

/*
	receber os parâmetros: data e hora
	sanitizar
	validar
	transformar no formato certo
	procurar no bd
	retornar resultado
*/
async function getAppointment(req, res) {
	console.log(`[getAppointment]`);

	try {
		const {
			date,
			time
		} = req.body

		// sanitizar
		const dataLimpo = DOMPurify.sanitize(date);
		const horaLimpo = DOMPurify.sanitize(time);

		// validar
		if(!dataLimpo || dataLimpo === null || dataLimpo === '') {
			console.log('[/getAppointment] data inválida');

			res.status(400).send({
				code: "DATA_INVALIDA",
				message: "data inválida",
				result: null
			});
			return;
		}
		
		if(!hora || hora === null || hora === '') {
			console.log('[/getAppointment] hora inválida');

			res.status(400).send({
				code: "HORA_INVALIDA",
				message: "hora inválida",
				result: null
			});
			return;
		}

		const dateTime = getDateTimeFormat(dataLimpo, horaLimpo);

		const dbResult = await getAppointmentByDateAndTime(dateTime);

			if(!dbResult) {
			console.log("consulta não econtrada");
			res.status(404).send({
				code: "NOT_FOUND",
				message: "consulta não econtrada",
				result: null
			});
		};
		
		console.log(`consulta encontrada = ${dbResult}`);

		res.status(200).send({
			code: "OK",
			message: "consulta encontrada",
			result: dbResult
		});

	} catch (error) {
		console.log(`[getAppointment] error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
	}
}

module.exports  = {
	scheduleAppointment,
	getAppointment,
	getAppointmentByDateAndTime,
	getAllAppointments,
	getAllDbAppointments
}