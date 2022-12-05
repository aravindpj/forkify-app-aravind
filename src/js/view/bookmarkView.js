import View from "./view";
import icons from '../../img/icons.svg';
import previewView from "./previewView";



class BookmarkView extends View{
    _parentElement=document.querySelector('.bookmarks__list')
    _errorMessage=`No bookmark yet! `

    renderBookmarkHandler(handler){
        window.addEventListener('load',handler)
    }

    _generateMarkup(){
        return this._data.map(bookmark=>previewView.render(bookmark,false)).join('')
    }

}

export default new BookmarkView()