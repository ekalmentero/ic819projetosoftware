import StudentsModel from '../models/studentsModel.js'

export default class StudentsController {

        static getStudents(){
                return (StudentsModel.getStudents());
        }
}
