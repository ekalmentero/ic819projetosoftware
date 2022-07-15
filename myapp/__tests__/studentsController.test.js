
import StudentsController from '../controllers/studentsController.js'

// teste síncrono - ESTÁ ERRADO

test('get CR', () => {
    expect(StudentsController.getCR(1)).toBe(5.65);
});


// teste assíncrono
/*
test('get aluno (assíncrono)', () => {
    return Aluno.getAlunoBD(701677).then(data => {
      expect(data).toEqual([{"ID": 4, "matricula": "701677", "nome": "Abba"}]);
    });
})
*/
