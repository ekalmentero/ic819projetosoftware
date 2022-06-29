"use strict";
import fs from 'fs';
export default class Student {
  
    constructor(id, name){
        var _name = name;
        var _id = id;
        this.setName = function(name) { _name = name; }
        this.setId = function(id) { _id = id; }

        this.getName = function() { return _name; }
        this.getId = function() { return _id; }
    }
    
    /*static getStudents(){
        return ("lista de estudantes do model");
    }*/

    static getStudents (){
        fs.readFile('\data\\students.json', 'utf8', function(err, result) {
            var studentsList = [];
        
            if (!err) {
                var obj = JSON.parse(result);
                i = 0;
                i = obj.students.length;
                obj.students.forEach(function(student) {
                    if (i >=  0) {
                        studentsList[i] = student;
                        i--;
                    }
                });
            }else{
                console.error('erro ao ler arquivo: '+err.message);
            }	   
            return studentsList;
        });
    }

}