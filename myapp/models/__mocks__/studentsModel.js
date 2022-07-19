'use strict';

class Student{

    static async getHistoric(id){
		return ([
                    {
                        "id":1,
                        "code":"IC910",
                        "name":"Governaça de TI",
                        "credits":4,
                        "createdAt":"2022-07-14T21:36:21.000Z",
                        "updatedAt":"2022-07-14T21:36:21.000Z",
                        "historic":{
                                "grade":8,
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
                    }]

        );
 	}

}

module.exports = {
    Student,
}
