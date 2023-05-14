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
    status: 'idle',
    openModal: false,
    largeImg: '',
    totalHits: 0,
    page: 1,
    perPage: 12,
  };

  handleLargeImg = img => {
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      largeImg: img,
    }));
  };

  async onNewProps() {
    this.setState({
      status: 'loading',
      images: [],
      page: 1,
    });
  }

  handleToggle = () => {
    this.setState(prevState => ({ openModal: !prevState.openModal }));
  };

  handleClickButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  fatchData = async titleImg => {
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
      this.setState({ status: 'loading' });
      await this.fatchData(titleImg);
    }
  }

  render() {
    const { status, images, openModal, totalHits, largeImg, page, perPage } =
      this.state;
    return (
      <>
        {status === 'succes' && (
          <ul className={css.gallery}>
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
        )}

        {status === 'loading' && <Loader />}
        {totalHits / page > perPage && (
          <Button onClick={this.handleClickButton} />
        )}
        {openModal && <Modal onClose={this.handleToggle} largeURL={largeImg} />}
      </>
    );
  }
}

ImageGallery.propTypes = {
  titleImg: PropTypes.string.isRequired,
};
