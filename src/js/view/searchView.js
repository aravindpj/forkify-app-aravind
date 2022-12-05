class SearchView{
    _parentElement=document.querySelector('.search')

    getQuery(){
      const query=this._parentElement.querySelector('.search__field').value
      this.#clear()
      return query
    }
    #clear(){
        this._parentElement.querySelector('.search__field').value=''
    }
    addSearchHandler(handler){
        this._parentElement.addEventListener('submit',function(e){
            e.preventDefault()
            handler()
        })
    }
}
export default new SearchView()