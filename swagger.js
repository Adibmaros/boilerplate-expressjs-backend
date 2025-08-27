const swaggerJsdoc = require("swagger-jsdoc");

const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ExpressJS API",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Hapus global security - set per endpoint saja
    paths: {
      "/auth/register": {
        post: {
          summary: "Register user",
          tags: ["Auth"],
          // Tidak perlu security untuk endpoint public
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 },
                    name: { type: "string", minLength: 1 },
                  },
                  required: ["email", "password", "name"],
                },
              },
            },
          },
          responses: {
            201: {
              description: "Register berhasil",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          email: { type: "string" },
                          name: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            400: { description: "Register gagal" },
          },
        },
      },
      "/auth/login": {
        post: {
          summary: "Login user",
          tags: ["Auth"],
          // Tidak perlu security untuk endpoint public
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string", minLength: 6 },
                  },
                  required: ["email", "password"],
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login berhasil",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      token: { type: "string" },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          email: { type: "string" },
                          name: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: { description: "Login gagal" },
          },
        },
      },
      "/user/profile": {
        get: {
          summary: "Get user profile",
          description: "Mendapatkan profil user yang sedang login. Membutuhkan Bearer token pada header Authorization.",
          tags: ["User"],
          // Set security khusus untuk endpoint ini
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Profil user berhasil diambil",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "string",
                            example: "clx123abc456",
                          },
                          email: {
                            type: "string",
                            example: "user@email.com",
                          },
                          name: {
                            type: "string",
                            example: "User Name",
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-06-01T12:00:00.000Z",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: "Unauthorized - Token tidak valid atau tidak ada",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      error: {
                        type: "string",
                        example: "token dibutuhkan!",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // Kosongkan jika dokumentasi manual di file ini
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
