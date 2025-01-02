import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Account Management API',
      version: '1.0.0',
      description: 'API documentation for Account Management System',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://matrimoney-backend.vercel.app/api'
          : 'http://localhost:3000/api',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      }
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication endpoints'
      },
      {
        name: 'Account',
        description: 'Account management endpoints'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
        },
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
    },
    security: [
      {
        ApiKeyAuth: [],
        BearerAuth: []
      },
    ],
  },
  apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Include both TS and JS paths
};

export const specs = swaggerJsdoc(options); 