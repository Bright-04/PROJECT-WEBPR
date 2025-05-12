import articleService from "../services/article.service.js";

export async function publish(req, res, next) {
	try {
		// Lấy tất cả các bài viết có trạng thái "archived"
		const articles = await articleService.findByStatus("archived");
		const currentTime = new Date();

		// Sử dụng for...of để xử lý tuần tự
		for (const article of articles) {
			const publishedDate = new Date(article.published_date);
			if (publishedDate < currentTime) {
				await articleService.updateArticleStatus(article.article_id, "published");
			}
		}

		next(); // Tiếp tục đến middleware tiếp theo
	} catch (error) {
		// Xử lý lỗi và trả phản hồi phù hợp
		console.error("Error in publish middleware:", error);
		res.status(500).send("Internal Server Error");
	}
}
