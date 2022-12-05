import View from './view';
import icons from '../../img/icons.svg';
class AddRecipeView extends View {
  _message='Your Recipe successfully added'
  _parentElement=document.querySelector('.upload')
  _btnOpen=document.querySelector('.nav__btn')
  _btnClose=document.querySelector('.btn--close-modal')
  _window=document.querySelector('.add-recipe-window')
  _overlay=document.querySelector('.overlay')
  
   constructor(){
     super()
     this._addHandlerShowWindow()
     this._addHandlerHiddenWindow()
   }

  toggleWindow(){
    
    this._window.classList.toggle('hidden')
    this._overlay.classList.toggle('hidden')
  }

  _addHandlerShowWindow(){   
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
  }
  _addHandlerHiddenWindow(){
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
  }
  addHandlerUpload(handler){
    this._parentElement.addEventListener('submit',function(e){
        e.preventDefault()
        const formInputs= [...new FormData(this)]
        const data=Object.fromEntries(formInputs)

        handler(data)
    })
  }
}
export default new AddRecipeView();
