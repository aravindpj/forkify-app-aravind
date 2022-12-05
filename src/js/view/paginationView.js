import View from './view';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addPaginationHandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );

    //display page number one
    if (currentPage === 1 && numberOfPages > 1) {
      return `
            <button data-goto=${
              currentPage + 1
            } class="btn--inline pagination__btn--next">
               <span>Page ${currentPage + 1}</span>
               <svg class="search__icon">
                   <use href="${icons}#icon-arrow-right"></use>
               </svg>
            </button> 
            `;
    }
    //Display last page
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return `
            <button data-goto=${
              currentPage - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
              <span>Page ${currentPage - 1}</span>
            </button>
            `;
    }
    //To display middle pages
    if (currentPage < numberOfPages) {
      return `
            <button data-goto=${
              currentPage - 1
            } class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
               <span>Page ${currentPage - 1}</span>
            </button>

            <button data-goto=${
              currentPage + 1
            } class="btn--inline pagination__btn--next">
               <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
            `;
    }
    // if there is one page
    return '';
  }
}
export default new PaginationView();
