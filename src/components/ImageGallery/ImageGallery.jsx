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
    loading: false,
    openModal: false,
    largeImg: '',
    totalHits: 0,
    page: 1,
    perPage: 12,
  };

  handleLargeImg = event => {
    const img = event.currentTarget.id;
    this.setState(prevState => ({
      openModal: !prevState.openModal,
      largeImg: img,
    }));
  };

  async onNewProps() {
    this.setState({
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
    this.setState({
      loading: true,
    });
    try {
      const { page, perPage, images } = this.state;
      const api = await imagesApi(titleImg, page, perPage);
      // throw new Error();
      this.setState({
        images: [...images, ...api.hits],
        totalHits: api.totalHits,
      });
      if (api.totalHits === 0) {
        toast.error('Sorry...no images found', { theme: 'colored' });
      }
    } catch (error) {
      console.log(error);
      toast.error('Sorry...no images found', { theme: 'colored' });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log('Update');
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
    const { loading, images, openModal, totalHits, largeImg, page, perPage } =
      this.state;
    return (
      <>
        <ul className={css.gallery}>
          {images?.map(image => (
            <ImageGalleryItem
              key={image.id}
              imageURL={image.webformatURL}
              imageAlt={image.tags}
              largeURL={image.largeImageURL}
              onClick={this.handleLargeImg}
              isLoading={this.state.loading}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {totalHits / page > perPage && !loading && (
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
