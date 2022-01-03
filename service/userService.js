const model = require('../model/userModel');
const usermodel = new model.UserModel();
const newmodel = model.User;
const byCrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class UserService{
   
    async registerUserService(userObject) {
        let foundUser = await usermodel.findUser(userObject);
        let len = foundUser.data.length
        if (len == 0) {
            let hashedPassword = await usermodel.hashGenerate(userObject.password);
            let newUser = new newmodel({
                firstName: userObject.firstName,
                lastName: userObject.lastName,
                email: userObject.email,
                password: hashedPassword.data
            });
            let saved = await usermodel.RegisterUser(newUser)
            return saved
        } else {
            return foundUser;

        }
    }

    async loginService(loginData) {
        try {
            let response = {
                "success": true,
                "message": "",
                "data": ""
            }
            let data = await usermodel.findUser(loginData);
            if (data.data.length > 0) {
                return new Promise((resolve, reject) => {
                    byCrypt.compare(loginData.password, data.data[0].password)
                
                        .then((result) => {
                            console.log("bycrpt",result, "data" , loginData.password,data.data[0].password )
                            if (result) {
                                let token = jwt.sign({ email: data.data[0].email, id: data.data[0].id },"thejasree");
                                let obj = {
                                    firstName: data.data[0].firstName,
                                    lastName: data.data[0].lastName,
                                    userId: data.data[0]._id,
                                    email: data.data[0].email,
                                    token: token
                                }
                                response.success = result,
                                    response.message = 'login successfull',
                                    response.status = '200',
                                    response.data = obj
                                resolve({ response })
                            } else {
                                response.success = result,
                                    response.message = 'login failed Password missMatch',
                                    response.status = '500',
                                    response.data = null
                                resolve({ response })
                            }
                        })
                        .catch((error) => {
                            reject({ 'success': false, 'message': 'loginFailed password wrong', error: error, status: '400' })
                        });
                });
            } else {
                return data;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = new UserService();