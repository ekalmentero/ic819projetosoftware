import supertest from 'supertest';
import App from '../../src/App';

const req = supertest(App);
const baseRoute = '/api/user';
const token = process.env.ADMIN_TOKEN;

describe('GET /user', () => {

    it('SUCCESS: Should return all users', async () => {
        return req.get(baseRoute).set('Authorization', `Bearer ${token}`).then(res => expect(res.statusCode).toEqual(200));
    });

    it('FAIL: Should return 400 for a registration that doesnt exist', async () => {
        return req.get(`${baseRoute}/000000`).set('Authorization', `Bearer ${token}`).then(res => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toBe("ID inválido ou inexistente.");
        });
    });

});

describe('POST /user and DELETE /user', () => {

    it('FAIL: Should return 400 for a user with no CPF.', async () => {
        const invalidRegister = {
            name: 'Daniel Vinicius',
            phone: '(21)90000-0000',
            password: '123456',
            email: 'danielvinicius@ufrrj.br',

        };
        return req.post(baseRoute).send(invalidRegister).then(res => expect(res.body.error).toBe('Informações insuficientes.'));
    });

    it('SUCCESS: Should insert user in database successfully', async () => {
        const validUserData = {
            id: 999,
            name: 'João Miranda',
            phone: '(21)90000-0000',
            cpf: '123.456.789-00',
            password: '123456',
            email: 'joao.miranda@yahoo.com',
        };
        return req.get(`${baseRoute}/${validUserData.id}`).set('Authorization', `Bearer ${token}`).then(async res => {
            // user already exists
            if (res.statusCode === 200) {
                return req.delete(`${baseRoute}/${validUserData.id}`).set('Authorization', `Bearer ${token}`).then(async res => {
                    expect(res.statusCode).toBe(200);
                    return req.post(baseRoute).send(validUserData).then(res => expect(res.body.data.email).toEqual(validUserData.email));
                });
            } 
            else {
                return req.post(baseRoute).send(validUserData).then(res =>  expect(res.body.data.email).toEqual(validUserData.email));
            }
        });
    });

});

describe('PUT /user', () => {
    it('FAIL: Should not update user with setting admin as true', async () => {
        const hackingData = {
            admin: true
        };
        return req.get(`${baseRoute}/999`).then(async res => {
            if (res.statusCode === 200) {
                return req.put(`${baseRoute}/999`).send(hackingData).then(res => expect(res.statusCode).toBe(400));
            }
        });
    });
});