import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ cards, onOpenModal }) => {
  return (
    <ul className={css.gallery}>
      {cards.map(card => (
        <li key={card.id} className={css.galleryItem}>
          <ImageCard {...card} onOpenModal={onOpenModal} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
