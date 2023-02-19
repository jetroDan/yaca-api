bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const swaggerDoc = require('../swagger.json')

const swaggerDocs = (app,port) =>{
    app.use(
        "/api/v1/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDoc)
      );

      console.log(`V1 swagger docs at http://localhost:${port}/api/v1/docs`);

}

module.exports = {swaggerDocs}
