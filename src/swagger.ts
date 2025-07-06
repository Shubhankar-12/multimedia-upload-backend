import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Multimedia Upload API",
      version: "1.0.0",
      description:
        "API for uploading, managing, and retrieving multimedia files.",
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/api` || "http://localhost:8080/api",
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],

  apis: ["./src/use_cases/**/doc.ts"], // Adjust to your actual routes path
};

export const swaggerSpec = swaggerJsdoc(options);
