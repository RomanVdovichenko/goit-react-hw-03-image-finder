import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  handleClick = event => {
    this.props.onClick(event.currentTarget.id);
  };
  render() {
    const { largeURL, imageURL, imageAlt } = this.props;
    return (
      <li className={css.gallery_item} id={largeURL} onClick={this.handleClick}>
        <img className={css.gallery_item_image} src={imageURL} alt={imageAlt} />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  largeURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
