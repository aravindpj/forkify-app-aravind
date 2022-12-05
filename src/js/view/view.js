import icons from '../../img/icons.svg';
export default class View {
  _data  

  render(data,render=true) {
    if(!data || (Array.isArray(data)&&data.length===0))
      return this.renderError()
    this._data = data;
    const Markup = this._generateMarkup();
    if(!render) return Markup
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', Markup);
  }
  
  update(data){
    this._data=data

    const newMarkup=this._generateMarkup()

    const newDOM=document.createRange().createContextualFragment(newMarkup)
    const newElement=Array.from(newDOM.querySelectorAll("*"))
    const curElement=Array.from(this._parentElement.querySelectorAll("*"))

    newElement.forEach((newEl , i)=>{
      let curEl=curElement[i]
      
      //Update Changed text
      if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !==''){
         
         curEl.textContent=newEl.textContent  

      }
      //update chenged attributes
      if(!newEl.isEqualNode(curEl)){
        (Array.from(newEl.attributes)).forEach(attr=> {
          return curEl.setAttribute(attr.name,attr.value)
        })
      }

    })

  }
  //Error Message
  renderError(message = this._errorMessage) {
    const Markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', Markup);
  }

  //Success Message
  renderMessage(message = this._message) {
    const Markup = `
          <div class="message">
              <div>
              <svg>
                  <use href="${icons}#icon-smile"></use>
              </svg>
              </div>
              <p>${message}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', Markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  //loading (buffering logo)
  loadingSpinner() {
    const Markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
         </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', Markup);
  }
}
