require("dotenv").config();
const mongoose = require('mongoose');
// const path = require('path');
// const fs = require('fs');

class Mongo{
    rootSchemasDir = __dirname + "/schemas/";
    connection;
    urlMongo;
    connected=false;

    constructor(){
        // mongoose.set('strictQuery', false);

            this.urlMongo = process.env.DB_CONNECTION
    }

    async initialize(){
        if(this.connected){
            return;
        }
        await this.connect();
        // this.createModels();
        this.connected = true;
        return;
    }

    async connect(){
        this.connection = mongoose.connection;
        this.connection.on('open', () => console.log("Connected to mongoDB at: " + this.urlMongo));
        this.connection.on('error', ()=>console.error("Error connecting to mongo at: "+this.urlMongo));
       await mongoose.connect(this.urlMongo);
        
        return;
    }

    // createModels(){
    //     fs.readdirSync(this.rootSchemasDir).forEach(filename => {
    //         let name = (path.basename(filename).replace(path.extname(filename), ''));
    //         let schema = require(this.rootSchemasDir + filename);
    //         let model = mongoose.model(name,schema,true);
    //         this[model.modelName] = model;
    //     });
    // }
}

module.exports = new Mongo();