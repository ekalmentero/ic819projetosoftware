import {ClassesModel, ClassStudentModel } from '../models/classesModel.js'

async function getById(id){
        
        const resultClass = await ClassesModel.findByPk(id);
        return resultClass;         
        
}

async function getByCode(classCode){
        
        const resultClass = await ClassesModel.findAll({
                include: ['students'],
                      
                where: {
                        code: classCode
                }
        });
        return resultClass;         
        
}

async function getAll(){
        const classes = await ClassesModel.findAll();
        return classes;
}

// todo

async function add(classData) {
        await ClassesModel.create({
                code: classData.code,
                local: classData.local,
        });
}

async function addStudent(id_class, id_student) {
        await ClassStudentModel.create({
                studentId: id_student,
                classId: id_class,
        });
}

//getAll 
export default { getAll, getById, getByCode, add, addStudent };