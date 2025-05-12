import ArticleService from "../services/article.service.js";
import UserService from "../services/user.service.js";
import tagService from "../services/tag.service.js";

export default {
	async getArticleDetail(req, res) {
		try {
			const articleId = req.params.id || req.query.id;

			// Fetch article details
			const article = await ArticleService.findArticleById(articleId);
			if (!article) {
				return res.status(404).redirect("/404"); // Article not found
			}

			// Check if the article is premium
			if (article.is_premium) {
				const user = req.session.user;
				// console.log(user);
				if (!user) {
					return res.redirect("/login");
				}

				// Validate premium status
				const isPremiumUser = user.premium == 1 && user.subscription_expired_date && new Date(user.subscription_expired_date) > new Date();
				// console.log(isPremiumUser);
				if (!isPremiumUser) {
					return res.status(403).redirect("/404");
					//Chỗ này nên hiện wanning với nút bấm đăng ký premium rồi redirect to login.
				}
			}

			article.tags = await tagService.findTagsByArticleId(articleId);

			// Fetch comments and related articles in parallel
			const [comments, relatedArticles] = await Promise.all([
				ArticleService.findCommentsById(articleId),
				ArticleService.findRelatedArticles(parseInt(articleId), parseInt(article.category_id), 5),
			]);

			res.render("vwArticle/detail", {
				article,
				comments,
				relatedArticles,
			});
		} catch (error) {
			console.error("Error in getArticleDetail:", error);
			res.status(500).redirect("/500");
		}
	},

	async postComment(req, res) {
		try {
			const articleId = req.params.id;
			const { content } = req.body;
			const userId = req.session.user?.user_id;

			if (!userId) {
				return res.redirect("/login");
			}

			await ArticleService.addComment({
				article_id: articleId,
				user_id: userId,
				content: content,
				created_at: new Date(),
			});

			res.redirect(`/article/${articleId}`);
		} catch (error) {
			console.error("Error posting comment:", error);
			res.status(500).redirect("/500");
		}
	},

	async search(req, res) {
		try {
			const query = req.query.q;

			// Validate query input
			if (!query || query.trim() === "") {
				return res.render("vwHomepage/search", {
					query: "",
					results: [],
				});
			}

			// Check if the user is premium
			const userIsPremium = req.session.user ? req.session.user.premium == 1 : false;

			// Fetch search results
			const results = await ArticleService.search(query.trim(), userIsPremium);

			// Render search results
			res.render("vwHomepage/search", {
				query: query.trim(),
				results: results,
			});
		} catch (error) {
			console.error("Error in search:", error);

			// Render a user-friendly error message
			res.status(500).render("vwHomepage/error", {
				message: "Something went wrong. Please try again later.",
			});
		}
	},

	async downloadPDF(req, res) {
		try {
			const articleId = req.params.id;
			const user = req.session.user;

			if (!user) {
				return res.redirect("/500");
			}

			const isPremiumUser = user.premium == 1 && user.subscription_expired_date && new Date(user.subscription_expired_date) > new Date();

			if (!isPremiumUser) {
				return res.redirect("/500");
			}

			const article = await ArticleService.findArticleById(articleId);
			if (!article) {
				return res.status(404).redirect("/404");
			}

			res.json({
				success: true,
				article: {
					title: article.title,
					content: article.content,
					writer_name: article.writer_name,
					published_date: article.published_date,
				},
			});
		} catch (error) {
			console.error("Error in downloadPDF:", error);
			res.status(500).redirect("/500");
		}
	},
};
