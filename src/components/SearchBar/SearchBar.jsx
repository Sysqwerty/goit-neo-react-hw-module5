import toast, { Toaster } from 'react-hot-toast';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.query.value.trim();
    if (!query) {
      toast.error('Please enter a search query');
    } else {
      onSubmit(query);
    }

    event.target.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" aria-label="Search">
          <FaMagnifyingGlass size={20} />
        </button>
      </form>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </header>
  );
};

export default SearchBar;
