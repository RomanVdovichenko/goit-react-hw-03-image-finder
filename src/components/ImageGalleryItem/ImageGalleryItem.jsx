import React from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  largeURL,
  imageURL,
  imageAlt,
  onClick,
  isLoading,
}) => {
  return (
    <>
      <li className={css.gallery_item} id={largeURL} onClick={onClick}>
        {isLoading === 'succes' && (
          <img
            className={css.gallery_item_image}
            src={imageURL}
            alt={imageAlt}
          />
        )}
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  largeURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
};