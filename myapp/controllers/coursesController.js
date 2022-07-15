import {CoursesModel} from '../models/coursesModel.js'

async function getById(id){
        
        const course = await CoursesModel.findByPk(id);
        return course;         
        
}

async function getAll(){
        const courses = await CoursesModel.findAll();
        return courses;
}

function add(req, res) {
        CoursesModel.create({
                code: req.body.code,
                name: req.body.name,
                credits: req.body.credits,
        }).then((result) => res.json(result));
}

//getAll 
export default { getAll, getById, add };