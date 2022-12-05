import View from "./view";
import icons from '../../img/icons.svg';
import previewView from "./previewView";
class ResultView extends View{
    _parentElement=document.querySelector('.results')
    _errorMessage=`No result found!`
    _generateMarkup(){
        return this._data.map(result=>previewView.render(result,false)).join('')
    }

}
export default new ResultView()