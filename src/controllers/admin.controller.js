import articleService from "../services/article.service.js";
import userService from "../services/user.service.js";
import TagService from "../services/tag.service.js";

export default {
	async showArticlesPage(req, res) {
		try {
			const writerIds = await userService.findAllUsers("editor");
			const writer_ids = writerIds.map((user) => user.user_id);

			const pendingArticlePromises = writer_ids.map((writerId) => articleService.getArticlesByStatus(writerId, "waiting"));
			const pendingArticleResults = await Promise.all(pendingArticlePromises);
			const pendingArticles = pendingArticleResults.flat();

			const approvedArticlePromises = writer_ids.map((writerId) => articleService.getArticlesByStatus(writerId, "published"));
			const approvedArticleResults = await Promise.all(approvedArticlePromises);
			const approvedArticles = approvedArticleResults.flat();

			// console.log('Approved Articles:', approvedArticles);
			// console.log('Pending Articles:', pendingArticles);

			res.render("vwAdmin/admin.dashboard.ejs", {
				layout: "layouts/admin.main.ejs",
				approvedArticles: approvedArticles,
				pendingArticles: pendingArticles,
			});
		} catch (error) {
			console.error("Error fetching articles:", error);
			res.redirect("/500");
		}
	},

	async publishArticle(req, res) {
		try {
			const articleId = req.query.id;
			await articleService.publishArticle(articleId);
			// Redirect back to admin dashboard after publishing
			res.redirect('/admin');
		} catch (error) {
			console.error("Error publishing article:", error);
			res.redirect('/500');
		}
	},

	async getWriters(req, res) {
		try {
			// Lấy danh sách tất cả các writer
			const writers = await userService.findUsersByRole("writer");

			// Render trang danh sách writers
			res.render("vwAdmin/admin.writers.ejs", {
				writers: writers,
				layout: "layouts/admin.main.ejs",
			});
		} catch (error) {
			console.error("Error fetching writers:", error);
			res.redirect("/500");
		}
	},

	//Xem thông tin của một editor và danh sách các bài viết đã được published thuộc về writer đó
	async getWriterDetails(req, res) {
		try {
			const writerId = req.query.id; // Change this line
			console.log("Query parameters:", req.query);
			console.log("Writer ID:", writerId);

			// Rest of your code remains the same
			const writerDetails = await userService.findUserById(writerId, "writer");
			if (!writerDetails) {
				return res.status(404).redirect("/404", { message: "Writer not found" });
			}

			const publishedArticles = await articleService.findByWriterId(writerId);
			const filteredArticles = publishedArticles.filter((article) => article.status === "published");

			res.render("vwAdmin/admin.writer_details.ejs", {
				writer: writerDetails,
				layout: "layouts/admin.main.ejs",
				articles: filteredArticles,
			});
		} catch (error) {
			console.error("Error fetching writer details:", error);
			res.redirect("/500");
		}
	},

	// Display all tags
	async getAllTags(req, res) {
		try {
			const tags = await TagService.findAllTags();
			res.render("vwAdmin/tags.ejs", { tags, layout: "layouts/admin.main.ejs" });
		} catch (error) {
			console.error("Error in getAllTags:", error);
			res.status(500).redirect("/500");
		}
	},

	// Display tag details by ID
	async getTagById(req, res) {
		try {
			const tagId = req.params.id;
			const tag = await TagService.findTagById(tagId);
			if (!tag) {
				return res.status(404).render("vwError/404", { message: "Tag not found" });
			}
			res.render("vwAdmin/tag_details.ejs", { tag, layout: "layouts/admin.main.ejs" });
		} catch (error) {
			console.error("Error in getTagById:", error);
			res.status(500).render("vwError/500", { message: "Internal Server Error" });
		}
	},

	// Add a new tag
	async addTag(req, res) {
		try {
			const { tagName } = req.body;
			if (!tagName) {
				return res.status(400).redirect("/400");
			}
			await TagService.addTag(tagName);
			res.redirect("/admin/tags");
		} catch (error) {
			console.error("Error in addTag:", error);
			res.status(500).redirect("/500");
		}
	},

	// Update a tag
	async updateTag(req, res) {
		try {
			const tagId = req.params.id;
			const { tagName } = req.body;
			if (!tagName) {
				return res.status(400).redirect("/400");
			}
			const tag = await TagService.findTagById(tagId);
			if (!tag) {
				return res.status(404).redirect("/404");
			}
			await TagService.updateTag(tagId, tagName);
			res.redirect("/admin/tags");
		} catch (error) {
			console.error("Error in updateTag:", error);
			res.status(500).redirect("/500");
		}
	},

	// Delete a tag
	async deleteTag(req, res) {
		try {
			const tagId = req.params.id;
			const tag = await TagService.findTagById(tagId);
			if (!tag) {
				return res.status(404).redirect("/404");
			}
			await TagService.deleteTag(tagId);
			res.redirect("/admin/tags");
		} catch (error) {
			console.error("Error in deleteTag:", error);
			res.status(500).redirect("/500");
		}
	},
};
