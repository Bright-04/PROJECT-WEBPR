import ArticleService from "../services/article.service.js";
import CategoryService from "../services/category.service.js";
import TagsService from "../services/tag.service.js";
const ITEMS_PER_PAGE = 10; // Số bài viết trên mỗi trang

export default {
	async GetHomepage(req, res) {
		try {
			const topCate = await CategoryService.getTop10Views();

			// For each top category, get the top 1 newest article along with its tags
			const top10Category = await Promise.all(
				topCate.map(async (category) => {
					const articles = await ArticleService.findArticlesByCategoryIncludingSubcategories(category.category_id);
					const filtered = articles.filter((article) => article.status === "published");
					if (filtered.length > 0) {
						const article = filtered[0];
						const tags = await TagsService.findTagsByArticleId(article.article_id);
						return { ...article, tags };
					}
					return null; // Return null if no published articles are found for the category
				})
			);

			// Remove any null entries (if any categories didn't have published articles)
			const validTop10Category = top10Category.filter((article) => article !== null);

			// console.log(top10Category);

			// Get overall newest articles across all categories
			const newestArticles = await ArticleService.findByStatus("published");
			const top10Newest = await Promise.all(
				newestArticles.slice(0, 10).map(async (article) => {
					const tags = await TagsService.findTagsByArticleId(article.article_id);
					return { ...article, tags };
				})
			);

			// console.log(top10Newest);
			// Get most viewed articles
			const mostViewedArticles = await ArticleService.findByStatus("published");
			const top10MostViewed = await Promise.all(
				mostViewedArticles
					.sort((a, b) => b.views - a.views)
					.slice(0, 10)
					.map(async (article) => {
						const tags = await TagsService.findTagsByArticleId(article.article_id);
						return { ...article, tags };
					})
			);

			// Render the homepage with all required data
			res.render("vwHomepage/homepage", {
				categoryArticles: validTop10Category,
				newestArticles: top10Newest,
				mostViewedArticles: top10MostViewed,
			});
		} catch (error) {
			console.error("Error in GetHomepage:", error);
			res.status(500).json({
				message: "An error occurred while fetching homepage data",
			});
		}
	},

	async getCategoryArticles(req, res) {
		try {
			const categoryId = req.query.id;
			const page = parseInt(req.query.page) || 1;

			if (!categoryId) {
				return res.redirect("/404");
			}

			const category = await CategoryService.findCategoryById(categoryId);

			if (!category) {
				return res.redirect("/404");
			}

			const result = await CategoryService.findCategoryWithArticles(categoryId, page, ITEMS_PER_PAGE);

			if (!result) {
				return res.redirect("/404");
			}

			const { articles, totalPages } = result;

			res.render("../views/vwHomepage/list", {
				category,
				articles,
				currentPage: page,
				totalPages,
				categoryId,
			});
		} catch (err) {
			console.error(err);
			res.redirect("/500");
		}
	},
};
