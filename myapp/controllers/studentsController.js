import {StudentsModel, HistoricModel} from '../models/studentsModel.js'

async function getById(id){
        
        const student = await StudentsModel.findByPk(id);
        return student;         
        
}

async function getAll(){
        const students = await StudentsModel.findAll();
        return students;
}

async function getHistoric(id){
        const student = await StudentsModel.findAll({
                include: ['courses'],
                      
                where: {
                        id: id
                },
        
        });
        
        const studentHistoric = JSON.parse(JSON.stringify(student))[0].courses;
        return studentHistoric;
        
}

async function getCR(id){
        const studentCourses = await getHistoric(id);      
        var somaNotas = 0;
        var somaPesos = 1;
        for (var i=0; i<studentCourses.length; i++) {
                
                somaNotas += studentCourses[i].historic.grade*studentCourses[i].credits;
                somaPesos += studentCourses[i].credits;
        }
        if (somaNotas!= 0 & somaPesos!= 0){
                //arredonda o cálculo para 2 casas decimais
                var cr = Math.round(((somaNotas/somaPesos) + Number.EPSILON) * 100) / 100;

                // garante que o retorno será uma string
                return ''+cr;
        }
        return 'erro'+0;
       
}

async function addCourseToStudentHistoric(id_student, id_course, grade) {
        await HistoricModel.create({
                studentId: id_student,
                courseId: id_course,
                grade: grade,
        });
}



async function add(studentData) {
        await StudentsModel.create({
                name: studentData.name,
                registration: studentData.registration,
        });
}

//getAll
export default { getAll, getById, add, addCourseToStudentHistoric, getHistoric, getCR  };