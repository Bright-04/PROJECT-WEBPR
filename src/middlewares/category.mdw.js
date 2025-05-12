import CategoryService from "../services/category.service.js";

/**
 * Middleware to load categories directly from database
 * Recommended for better performance
 */
export async function setLocalCategories(req, res, next) {
	try {
		// Get parent categories first
		const parentCategories = await CategoryService.findAllCategories().where("belong_to", null);

		// Add subcategories to each parent category
		const categoriesWithSubcategories = await Promise.all(
			parentCategories.map(async (category) => ({
				...category,
				subcategories: await CategoryService.findSubcategories(category.category_id),
			}))
		);

		res.locals.categories = categoriesWithSubcategories;
		next();
	} catch (error) {
		console.error("Error fetching categories:", error);
		res.locals.categories = [];
		next(error);
	}
}

// Default to recommended implementation
export default setLocalCategories;
