import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '0.4.0',
      title: 'Ecommerce API',
      description:
        'Proyecto final del curso de backend con nodejs en Coderhouse (DOCUMENTACIÓN EN PROCESO).',
    },
  },
  apis: ['./src/docs/***/*.yaml', './src/docs/***/***/*.yaml'],
}

export const swaggerSpecs = swaggerJSDoc(options)
