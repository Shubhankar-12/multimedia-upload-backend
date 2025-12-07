# File Sharing System Backend

A production-ready Node.js backend service for secure file sharing, bulk uploads, and audit logging. Features AWS S3 storage, granular permission controls, and unique link generation.

## Overview

This backend is a comprehensive file-sharing platform. It allows users to upload multiple files to AWS S3, share them via email (granular permissions) or public links, and tracks all access via an audit log.

## Key Features

### 🔐 Authentication & Security

- **JWT-based Authentication**: Secure user login and registration.
- **Granular Permissions**: File owners can share access with specific users via email.
- **Protected Routes**: Middleware (`canAccessFile`) ensures only authorized users (owners or explicitly shared users) can access specific files.

### 📂 File Management

- **AWS S3 Integration**: Secure, scalable object storage replacing Cloudinary.
- **Bulk Uploads**: Support for uploading up to 10 files simultaneously.
- **Metadata Management**: Stores original filenames, MIME types, and S3 keys.
- **Search & Filter**: Find files by name, tag, or type.

### 🔗 Sharing & Collaboration

- **Email Sharing**: Grant specific users "View" access to your files.
- **Link Sharing**: Generate unique, shareable links (`/api/shared/:token`) for easy distribution.
- **Audit Logging**: Automatically logs "VIEW" events whenever a shared file is accessed, tracking who accessed what and when.

### 🛠 Developer Experience

- **Request Validation**: Robust request parsing and error handling.
- **Clean Architecture**: Separation of concerns (Controllers, Use Cases, Queries).
- **TypeScript**: Type-safe codebase.

## Technology Stack

| Component      | Technology                |
| -------------- | ------------------------- |
| Runtime        | Node.js                   |
| Framework      | Express.js                |
| Database       | MongoDB with Mongoose ODM |
| Cloud Storage  | **AWS S3**                |
| Authentication | JSON Web Tokens (JWT)     |
| Language       | TypeScript                |

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- AWS Account with S3 Bucket access

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

   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   AWS_REGION=your-bucket-region
   AWS_BUCKET_NAME=your-bucket-name
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The server will be available at `http://localhost:8080/api`

## API Documentation

### Authentication

All protected routes require `Authorization: Bearer <token>`.

#### 1. Upload Files (Bulk)

**POST** `/files/upload`

- Body (FormData): `documents` (Files, max 10), `tags` (JSON string)
- Uploads files to S3 and creates DB records.

#### 2. Share File (Email)

**POST** `/files/:id/share`

- Body: `{ "email": "user@example.com" }`
- Grants the user with this email access to the file.

#### 3. Generate Link

**POST** `/files/:id/link`

- Returns: `{ "url": "..." }`
- Generates a unique token for public/shared access.

#### 4. Access Shared File

**GET** `/shared/:token`

- Access a file using the generated token.
- **Audit Log**: Limits and logs this action as a "VIEW" event.

#### 5. List Files

**GET** `/files`

- Query Params: `search`, `filter` (type), `sort`
- Lists files owned by the current user.

#### 6. Delete File

**DELETE** `/files/delete`

- Body: `{ "file_id": "..." }`
- Permanently deletes file metadata (S3 deletion logic customizable).

#### 7. Update View Count

**PATCH** `/files/update_view_count`

- Query: `file_id`
- Manually increments view count and logs activity.

## Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
