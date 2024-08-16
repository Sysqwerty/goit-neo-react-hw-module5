import Modal from 'react-modal';
import { FaHeart } from 'react-icons/fa6';
import { formatDateToNow } from 'utils/formatDate';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({
  alt_description,
  regular,
  likes,
  created_at,
  name,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.image}>
        <img src={regular} alt={alt_description} />
      </div>
      <p className={css.likes}>
        <FaHeart /> {likes}
      </p>
      <div className={css.info}>
        <h3>{alt_description}</h3>
        <p>
          Created by <strong>{name}</strong>{' '}
          {isOpen && formatDateToNow(created_at)}
        </p>
      </div>
    </Modal>
  );
};

export default ImageModal;
