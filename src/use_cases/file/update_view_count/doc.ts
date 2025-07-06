/**
 * @swagger
 * /files/update_view_count:
 *   patch:
 *     summary: Increment view count for a file
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: file_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to update view count for
 *     responses:
 *       200:
 *         description: View count updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File view updated successfully
 *                 file_id:
 *                   type: string
 *                   example: 686a2ac1a267409145721558
 *       400:
 *         description: Missing or invalid file_id
 *       404:
 *         description: File not found
 *       500:
 *         description: Server error
 */
