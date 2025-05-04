import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'MealPrepTracker API',
    description: 'MealPrepTracker is an app that allows you to create recipes, use them to create meals, and track daily caloric intake'
  },
  host: `localhost:${process.env.PORT || 5000}`,
  schemes: ['http', 'https'],
};

// Output and endpoint files
const outputFile = './swagger-output.json';
const endpointsFiles = ['src/endpoints/routes/index.ts'];

// Generate Swagger output
swaggerAutogen()(outputFile, endpointsFiles, doc)