import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { imagesApi } from 'services/images';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export class ImageGallery extends Component {
  state = {
    images: [],
    largeImg: '',
    totalHits: 0,
    page: 1,
    perPage: 12,
    status: 'idle',
  };

  handleLargeImg = event => {
    const img = event.currentTarget.id;
    this.setState({
      status: 'openModal',
      largeImg: img,
    });
  };

  async onNewProps() {
    this.setState({
      images: [],
      page: 1,
    });
  }

  handleToggle = () => {
    this.setState({ status: 'succes' });
  };

  handleClickButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fatchData = async titleImg => {
    this.setState({
      status: 'loading',
    });
    try {
      const { page, perPage, images } = this.state;
      const api = await imagesApi(titleImg, page, perPage);
      // throw new Error();
      this.setState({
        images: [...images, ...api.hits],
        totalHits: api.totalHits,
        status: 'succes',
      });
      if (api.totalHits === 0) {
        toast.error('Sorry...no images found', { theme: 'colored' });
      }
    } catch (error) {
      console.log(error);
      toast.error('Sorry...no images found', { theme: 'colored' });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { titleImg } = this.props;
    const { page } = this.state;
    if (prevProps.titleImg !== titleImg) {
      await this.onNewProps();
      await this.fatchData(titleImg);
    }
    if (prevState.page !== page && page !== 1) {
      await this.fatchData(titleImg);
    }
  }

  render() {
    const { status, images, totalHits, largeImg, page, perPage } = this.state;
    return (
      <>
        <ul className={status === 'succes' ? css.gallery : css.gallery_none}>
          {images?.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              imageAlt={image.tags}
              largeURL={image.largeImageURL}
              onClick={this.handleLargeImg}
            />
          ))}
        </ul>

        {status === 'loading' && <Loader />}
        {totalHits / page > perPage && status === 'succes' && (
          <Button onClick={this.handleClickButton} />
        )}
        {status === 'openModal' && (
          <Modal onClose={this.handleToggle} largeURL={largeImg} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  titleImg: PropTypes.string.isRequired,
};
