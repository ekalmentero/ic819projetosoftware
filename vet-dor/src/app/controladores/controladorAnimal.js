const { database } = require('./../db/db');

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const validations = require('../validacoes');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// função para resgatar o animal de um usuário no bd pelo cpf
async function getAnimalByOwnerCpf(cpf) {
	if(!validations.cpfValidation(cpf)) {
		console.log('[getAnimalByOwnerCpf] cpf inválido');
		throw new Error("cpf inválido");
	};

	const animalRef = database.collection('animals').doc(cpf);
  const doc = await animalRef.get();

	// se não há um animal cadastrado com o cpf, retorna false
	if(!doc.exists) {
		return false;
	};
	
	// se há um animal cadastrado com o cpf, retorna os dados do animal
	return doc.data();
}

async function createAnimal (req, res) {
  console.log('[/createAnimal]');

	try {
		const {
			nome,
			raca,
			sexo,
			especie,
			idade,
			cpfResponsavel,
		} = req.body;

    const nomeLimpo = DOMPurify.sanitize(nome);
		const racaLimpo = DOMPurify.sanitize(raca);
		const sexoLimpo = DOMPurify.sanitize(sexo);
		const especieLimpo = DOMPurify.sanitize(especie);
		const idadeLimpo = DOMPurify.sanitize(idade);
		const cpfResponsavelLimpo = DOMPurify.sanitize(cpfResponsavel);

		// Validar as entradas
    if(!validations.nameValidation(nomeLimpo)) {
      console.log('[/createAnimal] nome inválido');

      res.status(400).send({
        code: "NOME_INVALIDO",
        message: "nome inválido",
        result: null
      });
      return;
    };

		if(especieLimpo.toUpperCase() !== "GATO" && especieLimpo.toUpperCase() !== "CACHORRO") {
			console.log('[/createAnimal] espécie inválido');

      res.status(400).send({
        code: "ESPECIE_INVALIDA",
        message: "espécie inválida",
        result: null
      });
      return;
		};

		if(!validations.cpfValidation(cpfResponsavelLimpo)) {
      console.log('[/createAnimal] cpf inválido');

      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
    };

    console.log('tudo válido');
			
		const dbData = {
			name: nomeLimpo,
			race: racaLimpo,
			sexo: sexoLimpo.toUpperCase(),
			species: especieLimpo.toUpperCase(),
			age: idadeLimpo,
			ownerCpf: cpfResponsavelLimpo
		}

		console.log(`[/createAnimal] dbData = ${dbData}`);
		console.log(`[/createAnimal] criar animal no bd`);

		// criar o animal no banco de dados - chave = cpf do responsável
    const animalRef = await database.collection('animals').doc(dbData.ownerCpf).set(dbData);

    console.log(`[/createAnimal] animalRef = ${animalRef}`);

    console.log('[/createAnimal] sucesso');

    // retorna para o frontend
    res.status(200).send({
      code: "OK",
      message: "cadastro bem sucedido",
      result: animalRef
    });

	} catch (error) {
		console.log(`/createUser error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
	}
}

async function getAnimal(req, res) {
	try {
		const { cpfResponsavel } = req.body;

		const cpfResponsavelLimpo = DOMPurify.sanitize(cpfResponsavel);

		if(!validations.cpfValidation(cpfResponsavelLimpo)) {
      console.log('[/createAnimal] cpf inválido');

      res.status(400).send({
        code: "CPF_INVALIDO",
        message: "cpf inválido",
        result: null
      });
      return;
    };

		const animalResult = await getAnimalByOwnerCpf(cpfResponsavelLimpo);

		if(!animalResult) {
			console.log("animal não cadastrado");
      res.status(404).send({
        code: "NOT_FOUND",
        message: "animal não cadastrado",
        result: null
      });
		};

		console.log(`animal encontrado = ${animalResult}`);
    res.status(200).send({
      code: "OK",
      message: "animal encontrado",
      result: animalResult,
    });
		
	} catch (error) {
		console.log(`/createUser error = ${error}`);
    res.status(500).send({
      code: "ERRO_INESPERADO",
      message: "Um erro inesperado aconteceu.",
      result: error,
    });
	}
};

module.exports = {
	createAnimal,
  getAnimal
}