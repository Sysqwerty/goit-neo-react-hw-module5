import css from './ImageCard.module.css';

const ImageCard = ({
  alt_description,
  urls: { small, regular },
  likes,
  created_at,
  user: { name },
  onOpenModal,
}) => {
  return (
    <div
      onClick={() =>
        onOpenModal({ alt_description, regular, likes, created_at, name })
      }
      className={css.card}
    >
      <img src={small} alt={alt_description} className={css.image} />
    </div>
  );
};

export default ImageCard;
