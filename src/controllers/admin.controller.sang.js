import articleService from "../services/article.service.js";
import categoryService from "../services/category.service.js";
import userService from "../services/user.service.js";
import tagService from "../services/tag.service.js";
export default {
	async getEditors(req, res) {
		try {
			// Fetch all users with the role of "editor"
			const editors = await userService.findUsersByRole("editor");
			// Process each editor
			const processedEditors = await Promise.all(
				editors.map(async (editor) => {
					try {
						// Fetch any additional related data if necessary, e.g., tags or statistics
						// (Example: Add more fields or transformations if needed)
						return {
							...editor,
							managedCategory: editor.managed_category_name || "Chưa có", // Default if no category
						};
					} catch (error) {
						console.error(`Error processing editor ${editor.user_id}:`, error);
						return editor; // Return editor even if additional processing fails
					}
				})
			);

			// Render the vwAdmin/editor view with the processed editors
			res.render("vwAdmin/editor", {
				editors: processedEditors,
			});
		} catch (error) {
			console.error("Error fetching editors:", error);
			return res.status(500).redirect("/500");
		}
	},
	async getEditorDetails(req, res) {
		try {
			const editorId = req.params.id || req.query.id;

			if (!editorId) {
				return res.status(400).send("Editor ID is required.");
			}
			const tags = await tagService.findTagsByArticleId("editor");

			// Fetch the editor details
			const editor = await userService.findUsersByRole("editor");
			const editorDetails = editor.find((e) => e.user_id === parseInt(editorId, 10));

			if (!editorDetails) {
				return res.status(404).send("Editor not found.");
			}

			// Fetch categories and organize them with subcategories
			const categories = await categoryService.findAllCategories();
			const organizedCategories = await Promise.all(
				categories.map(async (category) => {
					const subcategories = await categoryService.findSubcategories(category.category_id);
					return {
						...category,
						subcategories: subcategories || [],
					};
				})
			);

			// Fetch articles managed by the editor's category
			const articles = await articleService.findArticlesByCategoryIncludingSubcategories(editorDetails.managed_category_id);

			// Fetch roles excluding admin
			const roles = await userService.findAllRoles();
			const filteredRoles = roles.filter((role) => role.user_role !== "admin");

			// Render the view with organized data
			res.render("vwAdmin/editor_detail", {
				editor: {
					...editorDetails,
					managedCategory: editorDetails.managed_category_name || "Chưa có",
				},
				articles: articles || [],
				categories: organizedCategories,
				roles: filteredRoles,
				tags: tags || [],
			});
		} catch (error) {
			console.error("Error fetching editor details:", error);
			return res.status(500).redirect("/500");
		}
	},
};
