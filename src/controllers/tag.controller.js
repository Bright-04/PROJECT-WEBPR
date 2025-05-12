import TagService from "../services/tag.service.js";

const ITEMS_PER_PAGE = 10; // Số bài viết trên mỗi trang

export default {
	// Hiển thị danh sách bài viết theo tag
	async getArticlesByTag(req, res) {
		try {
			const tagId = req.query.id;
			const page = parseInt(req.query.page) || 1;

			// Kiểm tra tag có tồn tại không
			const tag = await TagService.findTagById(tagId);
			if (!tag) {
				return res.status(404).render("vwError/404", { message: "Tag not found" });
			}

			// Lấy danh sách bài viết theo tag
			const result = await TagService.findArticlesByTag(tagId, page, ITEMS_PER_PAGE);

			const { articles, totalPages } = result;

			// Truyền tag và bài viết vào view
			res.render("../views/vwHomepage/list_by_tag.ejs", {
				tag,
				articles,
				currentPage: page,
				totalPages,
				tagId,
			});
		} catch (error) {
			console.error("Error in getArticlesByTag:", error);
			res.status(500).render("vwError/500", { message: "Internal Server Error" });
		}
	},
};
