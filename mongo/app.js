
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , RecipeProvider = require('./recipeprovider').RecipeProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var recipeProvider= new RecipeProvider('localhost', 27017);

// Routes

app.get('/', function(req, res){
  recipeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'Recipes',
            recipes:emps
        });
  });
});

app.get('/recipe/new', function(req, res) {
    res.render('recipe_new', {
        title: 'New Recipe'
    });
});

//save new recipe
app.post('/recipe/new', function(req, res){
    recipeProvider.save({
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/')
    });
});


//update a recipe
app.get('/recipe/:id/edit', function(req, res) {
    recipeProvider.findById(req.param('_id'), function(error, recipe) {
        res.render('recipe_edit',
        { 
            recipe: recipe
        });
	});
});

//save updated recipe
app.post('/recipe/:id/edit', function(req, res) {
    recipeProvider.update(req.param('_id'),{
            name: req.param('name')
    }, function(error, docs) {
            res.redirect('/')
    });
});

//delete a recipe
app.post('/recipe/:id/delete', function(req, res) {
    recipeProvider.delete(req.param('_id'), function(error, docs) {
        res.redirect('/')
    });
});

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

