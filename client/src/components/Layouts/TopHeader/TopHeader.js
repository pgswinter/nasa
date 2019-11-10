import React from 'react';
import PropTypes from 'prop-types';
//import { Test } from './TopHeader.styles';
import SortBar from '../SortBar';

const onOpenModal = (props) => {
  props.openModal()
}

const TopHeader = (props) => {
  const {
    // Cancel Sort/Filter
    handleCancelSortOrFilter,
    // Sort by Type
    handleFilterType,
    // Sort by Title
    isSortByTitle,
    handleSortTitle,
    // Filter Date
    isFilteredByDate,
    startDate,
    handleFilterDateFrontr,
    // Filter Favourite
    isFilteredByFavourite,
    handleFilterFavourite,
    handleCancelFilterFavourite,
    // Sort by Date
    isSortedByDate,
    handleSortByDate,
    isSortedByDescDate,
    handleSortByDescDate,
  } = props;
  return (
    <div className="topHeader">
      <h1><span>nasa</span> Collection</h1>
      <button className="btn btn-add" onClick={() => onOpenModal(props)}>+ Add new item</button>
      <SortBar
        // Cancel Sort/Filter
        handleCancelSortOrFilter={handleCancelSortOrFilter}
        // Sort by Type
        handleFilterType={handleFilterType}
        // Sort by Title
        isSortByTitle={isSortByTitle}
        handleSortTitle={handleSortTitle}
        // Filter Date
        isFilteredByDate={isFilteredByDate}
        startDate={startDate}
        handleFilterDateFrontr={handleFilterDateFrontr}
        // Filter Favourite
        isFilteredByFavourite={isFilteredByFavourite}
        handleFilterFavourite={handleFilterFavourite}
        handleCancelFilterFavourite={handleCancelFilterFavourite}
        // Sort by Date
        isSortedByDate={isSortedByDate}
        handleSortByDate={handleSortByDate}
        isSortedByDescDate={isSortedByDescDate}
        handleSortByDescDate={handleSortByDescDate}
      />
    </div>
  )
};

TopHeader.propTypes = {
  startDate: PropTypes.instanceOf(Date),
  isFilteredByFavourite: PropTypes.bool,
  isSortedByDate: PropTypes.bool,
  isFilteredByDate: PropTypes.bool,
  isSortByTitle: PropTypes.bool,
  isSortedByDescDate: PropTypes.bool,
  
  handleCancelSortOrFilter: PropTypes.func,
  handleFilterType: PropTypes.func,
  handleSortTitle: PropTypes.func,
  handleFilterDateFrontr: PropTypes.func,
  handleFilterFavourite: PropTypes.func,
  handleCancelFilterFavourite: PropTypes.func,
  handleSortByDate: PropTypes.func,
  handleSortByDescDate: PropTypes.func,
};

TopHeader.defaultProps = {
  // bla: 'test',
};

export default TopHeader;
