import { API_URL, RES_PER_PAGE, KEY } from './config.js';
import { AJAX} from './helper.js';
// import { getJSON, sendJSON } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
const createObjectRecipe=function(data){
    let { recipe } = data.data;
    return  {
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      ...(recipe.key && ({key:recipe.key}))
    };
}

//LOAD RECIPE
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);
    state.recipe=createObjectRecipe(data)
    // display bokmark
    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;

    //Reset to page number
    state.search.page = 1;
  } catch (error) {
    console.error(`${error.message}`);
    throw error;
  }
};

//LOAD SEARCH RESULT
export const loadSearchRecipe = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        publisher: recipe.publisher,
        image: recipe.image_url,
        title: recipe.title,
        ...(recipe.key && ({key:recipe.key}))
      };
    });
  } catch (error) {
    console.error(error);
  }
};

//SEARCH RESULTS DIVIDING 
export const searchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage;
  const end = page * state.search.resultPerPage;
  return state.search.results.slice(start, end);
};


//UPDATING SERVIG DATA
export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};
const presistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (state.recipe.id === recipe.id) state.recipe.bookmark = true;
  presistBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(recipe => recipe.id === id);
  state.bookmarks.splice(index, 1);
  if (state.recipe.id === id) state.recipe.bookmark = false;
  presistBookmark();
};




//UPLOAD RECIPE DATA
export const uploadRecipe = async function (newRecipe) {
  try {
    console.log(newRecipe);
    // ing to array and refator it
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(eachEl=>eachEl.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('wrong input! ');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : '', unit, description };
      });
    //after create object
   console.log(ingredients);
    const recipe = {
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      title: newRecipe.title,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${KEY}`,recipe);
    state.recipe=createObjectRecipe(data)
    addBookmark(state.recipe)
  } catch (error) {
    throw error;
  }
};
const init = function () {
  let storage = localStorage.getItem('bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();
