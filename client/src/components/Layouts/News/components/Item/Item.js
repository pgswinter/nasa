import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageLoader from 'react-imageloader';
//import { Test } from './Item.styles';

import loading from '../../../../../images/loading.gif';

import {
  formState,
  fieldValidation
} from '../../../../../validation/validationForm';
import {
  textareaErrorTex,
  textareaRegex,
  linkErrorText,
  linkRegex
} from '../../../../../validation/validateEntry';

class Item extends Component {
  state = formState;

  preloader = () => {
    return <img src={loading} alt="loading" />;
  }
  onHandleLike = (id) => {
    this.props.handleLike(id);
  }
  onHandleDelete = (id) => {
    this.props.handleDelete(id);
  }
  onHandleEditForm = (id) => {
    this.props.handleEditForm(id);
  }
  onHandleCancelEdit = (id) => {
    this.props.handleCancelEdit(id);
  }
  // *** VALIDATION FIELD ***//
  onChangeField = (e, fieldRegex, fieldName, fieldError) => {
    const validatedField = fieldValidation(e, fieldRegex, fieldError);
    this.setState(prevState => {
      const { formValidate } = prevState;
      return {
        formValidate: {
          ...formValidate,
          [fieldName]: validatedField
        },
      }
    })
  }
  // *** EDIT NASA *** //
  onHandleEdit = (id) => {
    const { formValidate: { title, description, href } } = this.state;
    if (
      title.text === null || title.text === '' ||
      description.text === null || description.text === '' ||
      href.text === null || href.text === ''
    ) {
      this.setState({
        submitError: 'Any field is not allow empty'
      })
    } else {
      if (title.error || description.error || href.error) {
        this.setState({
          submitError: 'Please typing like as error message'
        })
      } else {
        const params = {
          nasaId: id,
          title: title.text,
          description: description.text,
          href: href.text,
        }
        this.props.handleEdit(params);
        // Return field data null
        this.setState(() => {
          return formState
        })
      }
    }
  }

  render() {
    const {
      item,
    } = this.props;
    const {
      data: {
        nasa_id,
        title,
        // media_type,
        // center,
        date_created,
        description,
        isLiked,
        isEditting
      },
      media
    } = item;

    const {
      formValidate,
      submitError
    } = this.state;
    const titleValidate = formValidate.title;
    const descriptionValidate = formValidate.description;
    const hrefValidate = formValidate.href;

    const titleEntry = titleValidate.text;
    const descriptionEntry = descriptionValidate.text;
    const hrefEntry = hrefValidate.text;

    const titleError = titleValidate.error;
    const descriptionError = descriptionValidate.error;
    const hrefError = hrefValidate.error;

    return (
      <React.Fragment>
        {
          isEditting ?
            <React.Fragment>
              <div className="head__itemWrap editting">
                <input
                  onChange={(e) => this.onChangeField(e, textareaRegex, 'title', textareaErrorTex)}
                  type="text"
                  placeholder="Typing new title ..."
                  value={titleEntry}
                />
                <label className="error-text">{titleError}</label>
                <input
                  onChange={(e) => this.onChangeField(e, linkRegex, 'href', linkErrorText)}
                  type="text"
                  placeholder="Typing new image path ..."
                  value={hrefEntry}
                />
                <label className="error-text">{hrefError}</label>
              </div>
              <div className="body__itemWrap editting">
                <textarea
                  onChange={(e) => this.onChangeField(e, textareaRegex, 'description', textareaErrorTex)}
                  type="text"
                  placeholder="Typing new desciption ..."
                  value={descriptionEntry}
                >
                </textarea>
                <label className="error-text">{descriptionError}</label>
              </div>
              <button className="btn btn-submit" onClick={() => this.onHandleEdit(nasa_id)}>Submit</button>
              <button className="btn btn-submit cancel" onClick={() => this.onHandleCancelEdit(nasa_id)}>Cancel</button>
              <label>{submitError}</label>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="head__itemWrap">
                <div className="imgWrap">
                  <ImageLoader
                    src={media}
                    wrapper={React.createFactory('div')}
                    preloader={this.preloader}>
                    Image load failed!
                  </ImageLoader>
                </div>
                <p>{moment(date_created).format("MMM Do YYYY") || moment(new Date()).format("MMM Do YYYY")}</p>
                <h2>
                  {title}
                </h2>
              </div>
              <div className="body__itemWrap">
                <p>{description}</p>
                <div className="footer__body">
                  <button className="btn" onClick={() => this.onHandleLike(nasa_id)}>{
                    isLiked ?
                      <i className="fas fa-heart"></i>
                      :
                      <i className="far fa-heart"></i>
                  }</button>
                  <button className="btn" onClick={() => this.onHandleDelete(nasa_id)}><i className="fas fa-trash"></i></button>
                  <button className="btn" onClick={() => this.onHandleEditForm(nasa_id)}><i className="fas fa-pencil-alt"></i></button>
                </div>
              </div>
            </React.Fragment>
        }
      </React.Fragment>
    )
  }
}


Item.propTypes = {
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleCancelEdit: PropTypes.func,
  handleEditForm: PropTypes.func,
  item: PropTypes.object,
};

Item.defaultProps = {
  // bla: 'test',
};

export default Item;
