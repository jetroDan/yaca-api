const User = require('../db/schemas/user')
const { STATUS_USER,ROLE_USER } = require('../lib/constants')

class UserController{

    async getAllUsers(){

    }
    async getUserId(id){
        return await User.findOne({_id:id})
    }    
    async getUserEmail(email){
        return await User.findOne({email:email})
    }
    async createUser(name,lastname,username,birthdate,telephone,email,password,dialcode){

        const data = {
            birthdate: new Date(birthdate),
            lastname: lastname,
            name: name,
            telephone: telephone,
            dialcode: dialcode,
            username: username,
            email: email,
            password: password,
            role: ROLE_USER.USER,
            status: STATUS_USER.ACTIVE
        }

        return await User.create(data)
 
    }
    async updateUser(){

    }
    
}

module.exports = new UserController()