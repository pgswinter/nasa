import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './News.styles';
import Item from './components/Item';

const News = (props) => {
  const {
    list,
    handleLike,
    handleEdit,
    handleDelete,
    handleEditForm,
    handleCancelEdit
  } = props;

  return (
    <div className="cards">
      {
        list.map((item, i) => {
          return (
            <div className="card-info__card" key={i}>
              <Item
                item={item}
                handleLike={handleLike}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleEditForm={handleEditForm}
                handleCancelEdit={handleCancelEdit}
              />
            </div>
          )
        })
      }
    </div>
  )
};

News.propTypes = {
  handleLike: PropTypes.func,
  handleEditForm: PropTypes.func,
  handleCancelEdit: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  list: PropTypes.array,
};

News.defaultProps = {
  // bla: 'test',
};

export default News;
