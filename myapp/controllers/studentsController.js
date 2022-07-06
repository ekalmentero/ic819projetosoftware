import {StudentsModel} from '../models/studentsModel.js'

async function getById(id){
        
        const student = await StudentsModel.findByPk(id);
        return student;         
        
}

async function getAll(){
        const students = await StudentsModel.findAll();
        return students;
}

function add(req, res) {
        StudentsModel.create({
                name: req.body.name,
                registration: req.body.registration,
        }).then((result) => res.json(result));
}

//getAll 
export default { getAll, getById, add };