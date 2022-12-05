import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import bookmarkView from './view/bookmarkView.js';
import paginationView from './view/paginationView.js';
import recipeView from './view/recipeView.js';
import resultView from './view/resultView.js';
import searchView from './view/searchView.js';
import addRecipeView from './view/addRecipeView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //Load Spinner
    recipeView.loadingSpinner();
    
    //1) Load Recope
    await model.loadRecipe(id);

    if (!model.state.recipe) return;

    //2) Render Recipe
    recipeView.render(model.state.recipe);

    // 3) update result view to marker to select search result 
    resultView.update(model.searchResultPage())
    bookmarkView.update(model.state.bookmarks)

  } catch (error) {
    recipeView.renderError(error.message);
  }
};

const searchRecipesControl = async function () {
  try {
    //1)get User Enterd Recipe
    let query = searchView.getQuery();

    //loading spinner
    resultView.loadingSpinner();

    //2)search recipe
    await model.loadSearchRecipe(query);

    //3)Render recipe
    //  console.log(model.state.search.results);
    resultView.render(model.searchResultPage());

    //Render Page number
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

//navigate pages
const paginationControl = function (goto) {
  //Render recipe result
  resultView.render(model.searchResultPage(goto));

  //Render Page number
  paginationView.render(model.state.search);
};
// Update Recipe serving
const updateServingControl = function (newServing) {
  model.updateServing(newServing);
  //update
  recipeView.update(model.state.recipe);
};

//bookmark
const controlBookmark=function(){
//0) to check add book mark or un bookmark
  if(!model.state.recipe.bookmark)
    model.addBookmark(model.state.recipe)
  else
    model.deleteBookmark(model.state.recipe.id)
//1) update recipe view 
  recipeView.update(model.state.recipe)

//2) render bookmarkView
  bookmarkView.render(model.state.bookmarks)
}
//this function is useful when reload browser after get bookmark items from the localstorage
const renderBookmark=function(){
  bookmarkView.render(model.state.bookmarks)
}

const addRecipeControl=async function(newRecipe){
  try {
    //load spinner
    addRecipeView.loadingSpinner()
    
    //upload
   await model.uploadRecipe(newRecipe)

   //load succes message
   addRecipeView.renderMessage()
   
   //render new recipe view user created
   recipeView.render(model.state.recipe)

   //render the bookmarview newly created recipe
   bookmarkView.render(model.state.bookmarks)
   
   window.history.pushState(null,'',`#${model.state.recipe.id}`)
   //close form window
   setTimeout(function(){
    addRecipeView.toggleWindow()
   },1000)
   
   console.log(model.state.recipe);
  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message)
  }
    
}

//Program starts
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addSearchHandler(searchRecipesControl);
   
  paginationView.addPaginationHandler(paginationControl);
  recipeView.addServingHandler(updateServingControl);

  recipeView.addBookmarkHandler(controlBookmark)

  bookmarkView.renderBookmarkHandler(renderBookmark)

  addRecipeView.addHandlerUpload(addRecipeControl)
};
init();
console.log(recipeView);


