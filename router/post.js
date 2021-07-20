const express = require("express")
const Post = require("../models/Post") // new
const router = express.Router()

// Get all posts
router.get("/posts", async (req, res) => {
	const posts = await Post.find()
	res.send(posts)
})
//////thêm mới
router.post("/posts", async (req, res) => {
	const { title, content} = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		const newPost = new Post({
			title,
			content,
		})

		await newPost.save()

		res.json({ success: true, message: 'Happy learning!', post: newPost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}    
});
// @route PUT api/posts
// @desc Update post
// @access Private
router.patch('/posts/:id', async (req, res) => {
	// Simple validation
	if (!req.body.title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

            try {
                const post = await Post.findOne({ _id: req.params.id })
        
                if (req.body.title) {
                    post.title = req.body.title
                }
        
                if (req.body.content) {
                    post.content = req.body.content
                }
        
                await post.save()
                res.send(post)
            } catch {
                res.status(404)
                res.send({ error: "Post doesn't exist!" })
            }
})
///xóa
router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})
module.exports = router