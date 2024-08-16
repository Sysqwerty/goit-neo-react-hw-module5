import { useState } from 'react';
import { fetchSearch } from './api';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalParams, setModalParams] = useState({});

  const handleSearch = async query => {
    setCards([]);
    setPage(1);
    setError(false);
    setLoading(true);

    try {
      setCards(await fetchSearch({ query }));
      setQuery(query);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const newCards = await fetchSearch({ query, page: nextPage });
      if (newCards.length === 0) {
        return;
      }
      setCards(prevCards => [...prevCards, ...newCards]);
      setPage(nextPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = data => {
    setIsOpenModal(true);
    setModalParams(data);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {!!cards.length && (
        <ImageGallery onOpenModal={handleOpenModal} cards={cards} />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {cards.length > 0 && cards.length % 10 === 0 && !loading && !error && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ImageModal
        {...modalParams}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </>
  );
};

export default App;
