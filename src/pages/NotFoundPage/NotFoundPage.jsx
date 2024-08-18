import BackLink from 'components/BackLink/BackLink';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <>
      <BackLink to="/">Go back</BackLink>
      <h1 className={css.title}>404 Page Not Found</h1>
    </>
  );
};

export default NotFoundPage;
