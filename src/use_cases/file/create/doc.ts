/**
 * @swagger
 * /files/upload:
 *   post:
 *     summary: Upload a new multimedia file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 file_id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 url:
 *                   type: string
 *                 size:
 *                   type: number
 *                 type:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 viewCount:
 *                   type: number
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                 user_id:
 *                   type: string
 *               example:
 *                 file_id: 686a3d2f221d94d82d2a8898
 *                 name: tick.svg
 *                 url: https://res.cloudinary.com/...
 *                 size: 574
 *                 type: image/svg+xml
 *                 tags: [tick, svg]
 *                 viewCount: 0
 *                 created_at: 2025-07-06T09:09:03.506Z
 *                 updated_at: 2025-07-06T09:09:03.506Z
 *                 user_id: 6869112583790b441a5caffe
 *       400:
 *         description: Invalid file upload
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
