const mongoose = require('mongoose');
const byCrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    'firstName': {
        type: String,
        required: [true, 'FirstName is required']
    },
    'lastName': {
        type: String,
        required: [true, 'LastName is required']
    },
    'email': {
        type: String,
        required: [true, 'Email Required']
    },
    'password': {
        type: String,
        required: [true, 'Password Required']
    }

}, {
    'timestamps': true
});
let User = mongoose.model('User', userSchema);



class UserModel {
    constructor() {

    }
    hashGenerate(password) {
        return new Promise((resolve, reject) => {
            byCrypt.hash(password, 10).then((password) => {
                console.log(password);

                resolve({ 'data': password })
            })
                .catch((error) => {
                    reject({ 'errr': error })
                })
        })

    }

    async findUser(req) {
   
        let response = {
            message: '',
            data: '',
            success: ''
        }
        let collab = {
            firstName: '',
            lastName: '',
            email: '',
            id: ''
        }
        return new Promise((resolve, reject) => {

            User.find({ 'email': req.email }).then((data) => {

                if (data.length > 0) {
                    collab.firstName = data[0].firstName,
                        collab.lastName = data[0].lastName,
                        collab.email = data[0].email,
                        collab._id = data[0]._id
                        response.success = true,
                        response.data = data,
                        response.message = 'user is already exist'
                    resolve(response)
                } else {
                    resolve({ 'message': 'user not found please register first', 'data': data })
                }
            })
                .catch((err) => {
                    reject({ success: false, 'error': err })
                })
        })
    };

    async  RegisterUser(req) {
        let response = {
            "success": true,
            "message": "",
            "data": ""
        }
        return new Promise((resolve, reject) => {
            req.save().then((data) => {
                console.log(" data in register ", data);

                response.success = true,
                    response.message = 'registeration succesfull',
                    response.data = data,
                    response.status = 200

                resolve({ response })
            }).catch((error) => {
                response.success = false,
                    response.message = 'registeration failed',
                    response.data = '',
                    response.status = 500,
                    response.error = error
                reject({ response })
            })
        });


    }

   
  
}
module.exports = { UserModel, User };
