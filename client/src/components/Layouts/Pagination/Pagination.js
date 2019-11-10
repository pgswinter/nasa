import React from 'react';
// import PropTypes from 'prop-types';
//import { Test } from './Pagination.styles';

const onHandleNextPage = (props) => {
  props.handleNextPage()
}

const onHandlePrevPage = (props) => {
  props.handlePrevPage()
}

const Pagination = (props) => {
  return (
    <React.Fragment>
      <button className="btn btn-pagination next" onClick={() => onHandleNextPage(props)}>
        <i className="fas fa-chevron-right"></i>
      </button>
      <button className="btn btn-pagination prev" onClick={() => onHandlePrevPage(props)}>
        <i className="fas fa-chevron-left"></i>
      </button>
    </React.Fragment>
  )
};

Pagination.propTypes = {
  // nasaList: PropTypes.string,
};

Pagination.defaultProps = {
  // bla: 'test',
};

export default Pagination;
