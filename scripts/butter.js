(function(){
	var recipeTemplateSource = $('#recipe-template').html();
	var recipeTemplate = Handlebars.compile(recipeTemplateSource);
	var recipeHtml = recipeTemplate({});
	var $recipeContainer = $('#recipes');

	var ingredientTemplateSource = $('#ingredient-template').html();
	var ingredientTemplate = Handlebars.compile(ingredientTemplateSource);
	var ingredientHtml = ingredientTemplate({});
	var ingredientContainer = ('.recipe-ingredients');

	// Button handler for adding new recipe
	$('#addRecipe').click(function(e){
		console.log("Adding RECIPE");
		// TODO use handlebars to get the template for a recipe
		$recipeContainer.append(recipeHtml);
	});

	// Button handler for adding new ingredient (need to use on)
	$('#recipes').on('click', '.js-add-ingredient', function(e){
		console.log("adding a New Ingredient");
		// TODO - need to make this smarter to handle appending to the actual parent when there is more than one recipe card.
		$(ingredientContainer).append(ingredientHtml);
		// TODO use handlebars to generate and add template
	});
})($);