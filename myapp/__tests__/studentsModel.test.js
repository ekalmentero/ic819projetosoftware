
const studentsModel = require('../models/studentsModel')
const db = require ('../db/db');

/* Se o método não fosse estático:
beforeAll(() => {
    jest.spyOn(tudentsModel.Student.getHistoric, 'sayMyName').mockImplementation(() => 'function implementation');
});
*/

// Mock de apenas um método da classe Student. Sem o mock o teste é de integração.
beforeAll(() => {
    jest.spyOn(studentsModel.Student, 'getHistoric').mockImplementation(() => JSON.parse(JSON.stringify([
		{
			"id":1,
			"code":"IC910",
			"name":"Governaça de TI",
			"credits":4,
			"createdAt":"2022-07-14T21:36:21.000Z",
			"updatedAt":"2022-07-14T21:36:21.000Z",
			"historic":{
					"grade":6,
					"createdAt":"2022-07-14T22:11:44.000Z",
					"updatedAt":"2022-07-14T22:11:44.000Z",
					"studentId":1,
					"courseId":1
					}
		},
		{
			"id":2,
			"code":"IC920",
			"name":"Arquitetura de Software",
			"credits":6,"createdAt":"2022-07-14T21:37:26.000Z",
			"updatedAt":"2022-07-14T21:37:26.000Z",
			"historic":{
				"grade":5.5,
				"createdAt":"2022-07-14T22:12:24.000Z",
				"updatedAt":"2022-07-14T22:12:24.000Z",
				"studentId":1,
				"courseId":2
				}
			},
		{
			"id":3,
			"code":"IH940",
			"name":"Ética",
			"credits":2,
			"createdAt":"2022-07-14T21:37:48.000Z",
			"updatedAt":"2022-07-14T21:37:48.000Z",
			"historic":{
				"grade":8.2,
				"createdAt":"2022-07-14T22:12:32.000Z",
				"updatedAt":"2022-07-14T22:12:32.000Z",
				"studentId":1,
				"courseId":3
			}
		}])));
});

afterAll(() => {
    jest.restoreAllMocks();
});

// teste síncrono - ESTÁ ERRADO!!
/*
test('get CR', () => {
    expect(studentsModel.Student.calculateCR(1)).toBe(5.65);
});


*/

// Teste assíncrono

test('get CR (assíncrono) ', async () => {
	const data = await studentsModel.Student.calculateCR(1);

	// Fechando as conexões com o banco de dados para evitar o warning do jest.
	db.close();
	
	expect(data).toBe('5.65');
});


