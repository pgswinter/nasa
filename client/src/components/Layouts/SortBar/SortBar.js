import React from 'react';
import PropTypes from 'prop-types';
import { typeData } from '../../../constant/type';
import DatePicker from 'react-datepicker';
//import { Test } from './SortBar.styles';

// Cancel Sort/Filter
const onHandleCancelSortOrFilter = (props) => {
  props.handleCancelSortOrFilter();
}
// Sort by Type
const onHandleFilterType = (e, props) => {
  props.handleFilterType(e);
}
// Sort by Title
const onHandleSortTitle = (props) => {
  props.handleSortTitle();
}
// Filter Date
const onHandleFilterDateFrontr = (props, date) => {
  props.handleFilterDateFrontr(date);
}
// Filter Favourite
const onHandleCancelFilterFavourite = (props) => {
  props.handleCancelFilterFavourite();
}
const onHandleFilterFavourite = (props) => {
  props.handleFilterFavourite();
}
// Sort by Date
const onHandleSortByDate = (props) => {
  props.handleSortByDate();
}
const onHandleSortByDescDate = (props) => {
  props.handleSortByDescDate();
}


const SortBar = (props) => {

  const {
    startDate,
    isFilteredByFavourite,
    isSortedByDate,
    isFilteredByDate,
    isSortByTitle,
    isSortedByDescDate,
  } = props;

  return (
    <div className="sortBar">
      <select className="selectType selector" onChange={(e) => onHandleFilterType(e, props)}>
        <option value="">Select type</option>
        {
          typeData.map((item, i) =>
            <option key={i} className="short" value={item === "all" ? '' : item}>{item}</option>
          )
        }
      </select>
      {
        isSortByTitle ?
          <button className='btn btn-submit cancel' onClick={() => onHandleCancelSortOrFilter(props)}>Cancel Sort Title</button> :
          <button className='btn btn-submit' onClick={() => onHandleSortTitle(props)}>Sort Title</button>
      }
      {
        isFilteredByDate ?
          <button className='btn btn-submit cancel' onClick={() => onHandleCancelSortOrFilter(props)}>Cancel Filter by Date</button> :
          <React.Fragment>
            <label>Select Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => onHandleFilterDateFrontr(props, date)}
            />
          </React.Fragment>
      }
      {
        isFilteredByFavourite ?
          <button className='btn btn-submit cancel' onClick={() => onHandleCancelFilterFavourite(props)}>Cancel Filter Favourite</button> :
          <button className='btn btn-submit' onClick={() => onHandleFilterFavourite(props)}>Filter Favourite</button>
      }
      {
        isSortedByDescDate ?
          <button className='btn btn-submit cancel' onClick={() => onHandleCancelSortOrFilter(props)}>Cancel Sort by DESC Date</button> :
          <button className='btn btn-submit' onClick={() => onHandleSortByDescDate(props)}>Sort by DESC Date</button>
      }
      {
        isSortedByDate ?
          <button className='btn btn-submit cancel' onClick={() => onHandleCancelSortOrFilter(props)}>Cancel Sort by ASC Date</button> :
          <button className='btn btn-submit' onClick={() => onHandleSortByDate(props)}>Sort by ASC Date</button>
      }
    </div>
  )
};

SortBar.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  isFilteredByFavourite: PropTypes.bool,
  isSortedByDate: PropTypes.bool,
  isFilteredByDate: PropTypes.bool,
  isSortByTitle: PropTypes.bool,
};

SortBar.defaultProps = {
  // bla: 'test',
};

export default SortBar;
