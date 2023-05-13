import React, { Component } from 'react';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    titleImg: '',
  };

  handleSearchSubmit = titleImg => {
    this.setState({ titleImg });
  };

  render() {
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery titleImg={this.state.titleImg} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
