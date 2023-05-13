import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';

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
