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

	var test_items = ["garlic", "orange", "sugar", "Garlic", "Sugar", "brown sugar"];

	var measurementOptions = ["whole", "cup", "teaspoon", "tablespoon", "can"];
	// TODO use handlebars to generate measurement Options for select box
	// Button handler for adding new recipe
	$addRecipeButton.click(function(e){
		$recipeContainer.append(recipeHtml);
	});

	// Button handler for adding new ingredient (need to use on)
	$recipeContainer.on('click', addIngredientButtons, function(e){
		$(this).parent('.recipe').find(ingredientContainer).append(ingredientHtml);
	});

	$('#runTest').click(function(){
		testApplication();
	});

	function init(){
		//adds a blank recipe and a blank ingredient
		$addRecipeButton.click();
		$(addIngredientButtons).click();
	}

	// intializing the application
	init();


	function testApplication(){
		var recipesList = $recipeContainer.find('.recipe');

		// for each recipe generate a name
		$(recipesList).each(function(index){
			$(this).find('.recipe-name').val("Test Recipe Name " + (index + 1));
			// for each ingredient in each recipe generate an ingredient
			var ingredientList = $(this).find(ingredientContainer);
			$(ingredientList).each(function(index){
				$(this).find('.recipe-amount').val(1);
				$('.recipe-measurement').val(measurementOptions[3]);
				$(this).find('.recipe-item').val(test_items[randomInt(0, (test_items.length-1))]);
			});
		}); 
	}

	/* UTILITIES */

	function randomInt(start, end){
		return start + Math.floor(Math.random() * end);
	}
})($);