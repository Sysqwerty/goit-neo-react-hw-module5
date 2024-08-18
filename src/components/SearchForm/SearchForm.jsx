import { HiSearch } from 'react-icons/hi';
import { errorToast } from 'utils/toasts';
import css from './SearchForm.module.css';

const SearchForm = ({ onSearchSubmit }) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const query = form.elements.query.value.trim();

    if (!query) {
      errorToast('Please enter a search query');
    }

    onSearchSubmit(query);
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        className={css.input}
      />
      <button type="submit" className={css.button}>
        <HiSearch />
      </button>
    </form>
  );
};

export default SearchForm;
