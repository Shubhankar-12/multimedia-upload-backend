/**
 * @swagger
 * /files/delete:
 *   delete:
 *     summary: Delete a file by file_id
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: file_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File deleted successfully
 *                 file_id:
 *                   type: string
 *                   example: 686a3d2f221d94d82d2a8898
 *       400:
 *         description: Missing or invalid file_id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
