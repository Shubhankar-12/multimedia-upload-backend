﻿# Multimedia Upload Backend

A production-ready Node.js backend service for secure multimedia file management with JWT authentication, cloud storage integration, and comprehensive API documentation.

## Overview

This backend provides a complete solution for handling multimedia files including images, videos, audio, and PDFs. Built with modern security practices and scalable architecture, it offers user authentication, file management, and robust API endpoints for seamless integration with frontend applications.

## Key Features

### Authentication & Security

- JWT-based user authentication system
- Protected routes with Bearer token validation
- Secure password handling and user management
- CORS configuration for cross-origin requests

### File Management

- Multi-format file upload support (images, videos, audio, PDFs)
- Cloudinary integration for reliable cloud storage
- MIME type validation and security filtering
- File search, filtering, and sorting capabilities
- View count tracking and analytics

### Developer Experience

- Interactive Swagger UI documentation
- Environment-based configuration
- Comprehensive error handling
- Clean, maintainable codebase structure

## Technology Stack

| Component      | Technology                |
| -------------- | ------------------------- |
| Runtime        | Node.js                   |
| Framework      | Express.js                |
| Database       | MongoDB with Mongoose ODM |
| Cloud Storage  | Cloudinary                |
| Authentication | JSON Web Tokens (JWT)     |
| Documentation  | Swagger UI                |
| Code Quality   | ESLint + Prettier         |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Cloudinary account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shubhankar-12/multimedia-upload-backend.git
   cd multimedia-upload-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory:

   ```env
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/multimedia-db
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:8080/api`

## API Documentation

### Interactive Documentation

Access the complete API documentation with interactive testing capabilities at:
**`http://localhost:8080/api-docs`**

For protected endpoints, click the "Authorize" button and enter your Bearer token.

### Authentication Endpoints

#### Register User

- **POST** `/auth/register`
- Creates a new user account
- **Body**: `{ "username": "string", "email": "string", "password": "string" }`

#### User Login

- **POST** `/auth/login`
- Authenticates user and returns JWT token
- **Body**: `{ "email": "string", "password": "string" }`

### File Management Endpoints

#### Upload File

- **POST** `/files/create`
- **Authentication**: Required
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `file`: Binary file data
  - `tags`: Array of string tags (optional)

#### List Files

- **GET** `/files`
- **Query Parameters**:
  - `search`: Search by filename
  - `sort`: Sort by `size`, `created_at`, `viewCount`
  - `filter`: Filter by file type, e.g., `image`, `video`, `audio`, `pdf`

#### Delete File

- **DELETE** `/files/delete`
- **Authentication**: Required
- **Query Parameters**: `file_id`

#### Update View Count

- **GET** `/files/update_view_count`
- **Authentication**: Required
- **Query Parameters**: `file_id`

### Example Request

```bash
curl -X POST http://localhost:8080/api/files/create \
  -H "Authorization: Bearer your_jwt_token_here" \
  -F "file=@/path/to/your/file.jpg" \
  -F "tags=nature,photography"
```

## Development

### Code Quality

Maintain code quality with built-in linting and formatting:

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are properly configured:

- Use strong, unique JWT secrets
- Configure production MongoDB URI
- Set up Cloudinary production credentials
- Configure appropriate CORS origins

### Security Considerations

- Enable HTTPS in production
- Implement rate limiting
- Configure proper CORS policies
- Regular security audits and updates

## Roadmap

### Upcoming Features

- **Pagination**: Implement cursor-based pagination for large file lists
- **Rate Limiting**: Add request throttling for API endpoints
- **File Versioning**: Support for file version management
- **Admin Panel**: Administrative interface for file moderation
- **Public/Private Files**: User-controlled file visibility settings
- **Advanced Search**: Full-text search capabilities
- **File Compression**: Automatic image optimization
- **Batch Operations**: Multiple file upload and management

### Performance Enhancements

- Redis caching integration
- Database query optimization
- CDN integration for faster file delivery
- Background job processing for heavy operations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**Ready to get started?** Follow the installation guide above and check out the interactive API documentation to explore all available endpoints!
# multimedia-upload-backend
