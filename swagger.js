// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Kişisel Sağlık Takip API',
      version: '1.0.0',
      description: 'Kullanıcı ve sağlık verileri yönetimi',
    },
    servers: [
      {
        url: 'https://localhost:3000', // HTTPS kullandığın için bu önemli
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // sadece gösterim içindir
        },
      },
    },
    security: [
      {
        bearerAuth: [], // tüm endpoint'lere varsayılan olarak uygulamak için
      },
    ],
  },
  apis: ['./routes/*.js'], // Swagger açıklamalarını buradaki dosyalardan alır
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
