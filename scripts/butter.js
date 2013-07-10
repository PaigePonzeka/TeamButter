(function(){
	var recipeTemplateSource = $('#recipe-template').html();
	var recipeTemplate = Handlebars.compile(recipeTemplateSource);
	var recipeHtml = recipeTemplate({});
	var $recipeContainer = $('#recipes');

	var ingredientTemplateSource = $('#ingredient-template').html();
	var ingredientTemplate = Handlebars.compile(ingredientTemplateSource);
	var ingredientHtml = ingredientTemplate({});
	var ingredientContainer = ('.recipe-ingredients');

	var $addRecipeButton = $('#addRecipe');
	var addIngredientButtons = '.js-add-ingredient'; // not an object because they are generated per recipe

	// Button handler for adding new recipe
	$addRecipeButton.click(function(e){
		console.log("Adding RECIPE");
		$recipeContainer.append(recipeHtml);
	});

	// Button handler for adding new ingredient (need to use on)
	$('#recipes').on('click', addIngredientButtons, function(e){
		// TODO - need to make this smarter to handle appending to the actual parent when there is more than one recipe card.
		$(ingredientContainer).append(ingredientHtml);
	});

	function init(){
		//adds a blank recipe and a blank ingredient

		$addRecipeButton.click();
		$(addIngredientButtons).click();
	}

	// intializing the application
	init();
})($);