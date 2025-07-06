/**
 * @swagger
 * /files:
 *   get:
 *     summary: Get all uploaded files with optional search, sort, and filter
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search files by name or tags (partial match)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [created_at, viewCount]
 *         description: Sort by creation time or view count
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [image, video, audio, pdf]
 *         description: Filter by file type (based on MIME type prefix or exact match)
 *     responses:
 *       200:
 *         description: List of matching files
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       file_id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       url:
 *                         type: string
 *                       size:
 *                         type: number
 *                       type:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       viewCount:
 *                         type: number
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                       user_id:
 *                         type: string
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: number
 *               example:
 *                 result:
 *                   - file_id: "686a3d2f221d94d82d2a8898"
 *                     name: "tick.svg"
 *                     url: "https://res.cloudinary.com/.../tick.svg"
 *                     size: 574
 *                     type: "image/svg+xml"
 *                     tags: ["tick", "svg"]
 *                     viewCount: 0
 *                     created_at: "2025-07-06T09:09:03.506Z"
 *                     updated_at: "2025-07-06T09:09:03.506Z"
 *                     user_id: "6869112583790b441a5caffe"
 *                 metadata:
 *                   totalCount: 4
 *       500:
 *         description: Server error
 */
