/**
 * @module routes/api/comments
 * @description Express router for handling comment-related API endpoints.
 */

 /**
    * GET /
    * @summary Retrieve all comments.
    * @route GET /api/comments
    * @returns {Array<Object>} 200 - An array of comment objects
    * @returns {Error} 500 - Internal server error
    */

 /**
    * DELETE /:id
    * @summary Delete a comment by its ID.
    * @route DELETE /api/comments/{id}
    * @param {string} id.path.required - The ID of the comment to delete
    * @returns {Object} 200 - Success message
    * @returns {Error} 404 - Comment not found
    * @returns {Error} 500 - Internal server error
    */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Hey Github Copilot!
router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// add another endpoint to deleting a comment
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


