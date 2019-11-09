import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { Test } from './InsertModal.styles';

import {
  formState,
  fieldValidation
} from '../../../validation/validationForm';
import {
  textareaErrorTex,
  textareaRegex,
  linkErrorText,
  linkRegex
} from '../../../validation/validateEntry';

class InsertModal extends PureComponent {
  state = formState;

  componentDidMount = () => {

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
  // *** ADD NASA *** //
  onHandleAdd = () => {
    const { formValidate: { nasaId, title, description, href } } = this.state;
    if (
      nasaId.text === null || nasaId.text === '' ||
      title.text === null || title.text === '' ||
      description.text === null || description.text === '' ||
      href.text === null || href.text === ''
    ) {
      this.setState({
        submitError: 'Any field is not allow empty'
      })
    } else {
      if (nasaId.error || title.error || description.error || href.error) {
        this.setState({
          submitError: 'Please typing like as error message'
        })
      } else {
        const params = {
          nasaId: nasaId.text,
          title: title.text,
          description: description.text,
          href: href.text,
        }
        this.props.handleAdd(params);
        // Return field data null
        this.setState(() => {
          return formState
        })
      }
    }
  }

  render() {
    const {
      active
    } = this.props;
    const {
      formValidate: {
        nasaId,
        title,
        description,
        href
      },
      submitError
    } = this.state;

    const nasaIdEntry = nasaId.text;
    const titleEntry = title.text;
    const descriptionEntry = description.text;
    const hrefEntry = href.text;

    const nasaIdError = nasaId.error;
    const titleError = title.error;
    const descriptionError = description.error;
    const hrefError = href.error;
    return (
      <React.Fragment>
        <div className={`${active ? 'active' : ''} insertModal modal`}>
          <p>
            <label>Nasa Id</label>
            <input
              onChange={(e) => this.onChangeField(e, textareaRegex, 'nasaId', textareaErrorTex)}
              type="text"
              value={nasaIdEntry}
            />
            <label className="error-text">{nasaIdError}</label>
          </p>
          <p>
            <label>Title</label>
            <input
              onChange={(e) => this.onChangeField(e, textareaRegex, 'title', textareaErrorTex)}
              type="text"
              value={titleEntry}
            />
            <label className="error-text">{titleError}</label>
          </p>
          <p>
            <label>Description</label>
            <textarea
              onChange={(e) => this.onChangeField(e, textareaRegex, 'description', textareaErrorTex)}
              type="text"
              value={descriptionEntry}
            ></textarea>
            <label className="error-text">{descriptionError}</label>
          </p>
          <p>
            <label>IMG Path</label>
            <input
              onChange={(e) => this.onChangeField(e, linkRegex, 'href', linkErrorText)}
              type="text"
              value={hrefEntry}
            />
            <label className="error-text">{hrefError}</label>
          </p>
          <p>
            <button className="btn btn-submit" onClick={() => this.onHandleAdd()}>Submit</button>
            <label>{submitError}</label>
          </p>
        </div>
      </React.Fragment>
    );
  }
}

InsertModal.propTypes = {
  active: PropTypes.bool,
  handleAdd: PropTypes.func,
};

InsertModal.defaultProps = {
  // bla: 'test',
};

// const mapStateToProps = state => ({
//   // blabla: state.blabla,
// });

// const mapDispatchToProps = dispatch => ({
//   // fnBlaBla: () => dispatch(action.name()),
// });

export default connect(
  // mapStateToProps,
  // mapDispatchToProps,
)(InsertModal);
