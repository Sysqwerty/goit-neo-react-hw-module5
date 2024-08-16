import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button
      type="button"
      aria-label="Load More"
      className={css.btn}
      onClick={onLoadMore}
    >
      Load More
    </button>
  );
};

export default LoadMoreBtn;
