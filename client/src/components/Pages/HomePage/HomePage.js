import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  reqLikeFront,
  reqAddFront,
  reqEditForm,
  reqEditFront,
  reqCancelEdit,
  reqDeleteFront,

  reqFilterType,

  reqFilterDateFront,
  // reqCancelFilterDate,

  reqFilterFavouriteFront,
  reqCancelFilterFavourite,
  
  reqSortDateFront,
  reqSortDescDateFront,
  // reqCancelSortDate,

  reqSortTitleFront,
  // reqCancelSortTitle,

  reqSearchNasa
} from '../../../actions/nasa/actions';

import InsertModal from '../../Layouts/InsertModal';
import Loading from '../../Layouts/Loading';
import News from '../../Layouts/News';
import TopHeader from '../../Layouts/TopHeader';
import Pagination from '../../Layouts/Pagination';

//import { Test } from './HomePage.styles';

class HomePage extends PureComponent {
  state = {
    inputText: '',
    params: {
      q: 'apollo',
      media_type: 'image',
      page: 1
    },
    activeModal: false,
    beforeFilterByFavouriteData: [],
    // beforeSortByDateData: [],
    // beforeFilterByDate: [],
    // beforeSortTitle: [],
    startDate: new Date(),
  };


  componentDidMount = () => {
    const { params } = this.state;
    this.props.reqSearchNasa(params);
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  // *** CLOSE INSERT MODAL ** //
  handleClickOutside = (e) => {
    if (this.node.contains(e.target)) {
      this.setState({
        activeModal: false
      })
    }
  }

  // *** OPEN INSERT MODAL ** //
  openModal = () => {
    this.setState({
      activeModal: true
    })
  }

  // *** SEARCH NASA *** //
  handleSearch = (e) => {
    if (e.target.value.length > 0) {
      this.setState(prevState => {
        const { params } = prevState;
        params.q = e.target.value;
        params.page = 1;
        return {
          inputText: e.target.value,
          params: {
            ...params
          }
        }
      }, () => {
        const { params } = this.state;
        this.props.reqSearchNasa(params);
      });
    }
    else {
      this.setState(prevState => {
        const { params } = prevState;
        params.q = e.target.value;
        return {
          inputText: '',
          params: {
            q: '',
            media_type: 'image',
            page: 1
          }
        }
      }, () => {
        const { params } = this.state;
        this.props.reqSearchNasa(params);
      })
    }
  }

  // *** PROCESS CRUD FRONTEND *** //
  handleLike = (id) => {
    this.props.reqLikeFront(id)
  }
  handleAdd = (params) => {
    this.props.reqAddFront(params)
  }
  handleEditForm = (id) => {
    this.props.reqEditForm(id)
  }
  handleEdit = (params) => {
    this.props.reqEditFront(params)
  }
  handleCancelEdit = (params) => {
    this.props.reqCancelEdit(params)
  }
  handleDelete = (id) => {
    this.props.reqDeleteFront(id)
  }

  // *** CANCEL SORT/FILTER *** //
  handleCancelSortOrFilter = () => {
    this.setState({
      startDate: new Date(),
    }, () => {
      const { params } = this.state;
      this.props.reqSearchNasa(params);
    })
  }

  // *** FILTER FAVOURITE *** //
  handleFilterFavourite = () => {
    const { nasaList: { isLoaded, loading, data } } = this.props;
    if (!isLoaded || loading) {
      return <Loading />
    } else {
      this.setState({
        beforeFilterByFavouriteData: data
      }, () => {
        this.props.reqFilterFavouriteFront();
      })
    }
  }
  handleCancelFilterFavourite = () => {
    const { beforeFilterByFavouriteData } = this.state;
    if (beforeFilterByFavouriteData.length > 0) {
      this.props.reqCancelFilterFavourite(beforeFilterByFavouriteData);
    }
  }

  // *** SORT BY DATE *** //
  handleSortByDescDate = () => {
    this.props.reqSortDescDateFront();
    // const { nasaList: { isLoaded, loading, data } } = this.props;
    // if (!isLoaded || loading) {
    //   return <Loading />
    // } else {
    //   this.setState({
    //     beforeSortByDateData: data
    //   }, () => {
    //     this.props.reqSortDescDateFront();
    //   })
    // }
  }
  handleSortByDate = () => {
    this.props.reqSortDateFront();
    // const { nasaList: { isLoaded, loading, data } } = this.props;
    // if (!isLoaded || loading) {
    //   return <Loading />
    // } else {
    //   this.setState({
    //     beforeSortByDateData: data
    //   }, () => {
    //     this.props.reqSortDateFront();
    //   })
    // }
  }
  // handleCancelSortByDate = () => {
  //   const { beforeSortByDateData } = this.state;
  //   if (beforeSortByDateData.length > 0) {
  //     this.props.reqCancelSortDate(beforeSortByDateData);
  //   }
  // }

  // *** FILTER BY DATE PICKER *** //
  handleFilterDateFrontr = date => {
    this.setState({
      startDate: date
    }, () => {
      const { startDate } = this.state;
      this.props.reqFilterDateFront(moment(startDate).format('L'));
    })
    // const { nasaList: { isLoaded, loading, data } } = this.props;
    // if (!isLoaded || loading) {
    //   return <Loading />
    // } else {
    //   this.setState({
    //     beforeFilterByDate: data,
    //     startDate: date
    //   }, () => {
    //     const { startDate } = this.state;
    //     this.props.reqFilterDateFront(moment(startDate).format('L'));
    //   })
    // }
  }
  // handleCancelFilterDate = () => {
  //   const { beforeFilterByDate } = this.state;
  //   if (beforeFilterByDate.length > 0) {
  //     this.props.reqCancelFilterDate(beforeFilterByDate);
  //   }
  // }

  // *** SORT TITLE ***//
  handleSortTitle = () => {
    this.props.reqSortTitleFront();
    // const { nasaList: { isLoaded, loading, data } } = this.props;
    // if (!isLoaded || loading) {
    //   return <Loading />
    // } else {
    //   this.setState({
    //     beforeSortTitle: data
    //   }, () => {
    //     this.props.reqSortTitleFront();
    //   })
    // }
  }
  // handleCancelSortTitle = () => {
  // const { beforeSortTitle } = this.state;
  // if (beforeSortTitle.length > 0) {
  //   this.props.reqCancelSortTitle(beforeSortTitle);
  // }
  // const { params } = this.state;
  // this.props.reqSearchNasa(params);
  // }

  // *** FILTER TYPE *** //
  handleFilterType = (e) => {
    const { params } = this.state;
    params.media_type = e.target.value;
    this.props.reqSearchNasa(params);
  }

  // *** RENDER MAIN DATA UI *** //
  renderNews = (nasaList) => {
    const { isLoaded, loading, data } = nasaList
    if (!isLoaded || loading) {
      return <Loading />
    } else {
      return <News
        handleLike={this.handleLike}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        handleEditForm={this.handleEditForm}
        handleCancelEdit={this.handleCancelEdit}
        list={data}
      />
    }
  }
  // *** PAGINATION *** //
  handleNextPage = () => {
    const { nasaList } = this.props;
    const { isLoaded, loading, data } = nasaList
    if (!isLoaded || loading) {
      return <Loading />
    } else {
      this.setState(prevState => {
        const { params } = prevState;
        params.page += 1
        return {
          params: {
            ...params
          }
        }
      }, () => {
        const { total } = data;
        const { params } = this.state;
        if (params.page > Math.round(total / 100)) {
          params.page = 1;
        }
        this.props.reqSearchNasa(params);
      });
    }
  }
  handlePrevPage = () => {
    const { nasaList } = this.props;
    const { isLoaded, loading, data } = nasaList
    if (!isLoaded || loading) {
      return <Loading />
    } else {
      this.setState(prevState => {
        const { params } = prevState;
        params.page -= 1
        return {
          params: {
            ...params
          }
        }
      }, () => {
        const { total } = data;
        const { params } = this.state;
        if (params.page < 1) {
          params.page = Math.round(total / 100);
        }
        this.props.reqSearchNasa(params);
      });
    }
  }

  render() {
    const { activeModal, startDate } = this.state;
    const { nasaList } = this.props;
    const {
      isFilteredByFavourite,
      isSortedByDate,
      isFilteredByDate,
      isSortByTitle,
      isSortedByDescDate
    } = nasaList;

    return (
      <div className="homePage">
        <InsertModal
          active={activeModal}
          handleAdd={this.handleAdd}
        />
        <div className={`${activeModal ? 'active' : ''} container`} ref={node => this.node = node}>
          <Pagination
            handleNextPage={this.handleNextPage}
            handlePrevPage={this.handlePrevPage}
          />
          <TopHeader
            // Open Modal
            openModal={this.openModal}
            // Cancel Sort/Filter
            handleCancelSortOrFilter={this.handleCancelSortOrFilter}
            // Sort by Type
            handleFilterType={this.handleFilterType}
            // Sort by Title
            isSortByTitle={isSortByTitle}
            handleSortTitle={this.handleSortTitle}
            // Filter Date
            isFilteredByDate={isFilteredByDate}
            startDate={startDate}
            handleFilterDateFrontr={this.handleFilterDateFrontr}
            // Filter Favourite
            isFilteredByFavourite={isFilteredByFavourite}
            handleFilterFavourite={this.handleFilterFavourite}
            handleCancelFilterFavourite={this.handleCancelFilterFavourite}
            // Sort by Date
            isSortedByDate={isSortedByDate}
            handleSortByDate={this.handleSortByDate}
            isSortedByDescDate={isSortedByDescDate}
            handleSortByDescDate={this.handleSortByDescDate}
          />

          <DebounceInput
            placeholder="Typing your space photos you want ..."
            className="mainSearch"
            debounceTimeout={300}
            onChange={(e) => this.handleSearch(e)}
          />

          {this.renderNews(nasaList)}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  reqSearchNasa: PropTypes.func,
  reqLikeFront: PropTypes.func,
  reqFilterType: PropTypes.func,

  reqAddFront: PropTypes.func,
  reqEditForm: PropTypes.func,
  reqCancelEdit: PropTypes.func,
  reqEditFront: PropTypes.func,
  reqDeleteFront: PropTypes.func,

  reqSortTitleFront: PropTypes.func,
  // reqCancelSortTitle: PropTypes.func,

  reqFilterDateFront: PropTypes.func,
  // reqCancelFilterDate: PropTypes.func,

  reqSortDateFront: PropTypes.func,
  reqSortDescDateFront: PropTypes.func,
  // reqCancelSortDate: PropTypes.func,

  reqFilterFavouriteFront: PropTypes.func,
  reqCancelFilterFavourite: PropTypes.func,

  nasaList: PropTypes.object,
};

HomePage.defaultProps = {
  // bla: 'test',
};

const mapStateToProps = state => {
  const { searchNasa } = state;

  return {
    nasaList: searchNasa
  }
};

const mapDispatchToProps = dispatch => ({
  reqSearchNasa: (params) => dispatch(reqSearchNasa(params)),
  reqLikeFront: (params) => dispatch(reqLikeFront(params)),
  reqAddFront: (params) => dispatch(reqAddFront(params)),
  reqEditForm: (params) => dispatch(reqEditForm(params)),
  reqCancelEdit: (params) => dispatch(reqCancelEdit(params)),
  reqEditFront: (params) => dispatch(reqEditFront(params)),
  reqDeleteFront: (params) => dispatch(reqDeleteFront(params)),

  reqFilterType: (params) => dispatch(reqFilterType(params)),

  reqFilterFavouriteFront: () => dispatch(reqFilterFavouriteFront()),
  reqCancelFilterFavourite: (params) => dispatch(reqCancelFilterFavourite(params)),

  reqSortDateFront: (params) => dispatch(reqSortDateFront(params)),
  reqSortDescDateFront: (params) => dispatch(reqSortDescDateFront(params)),
  // reqCancelSortDate: (params) => dispatch(reqCancelSortDate(params)),

  reqFilterDateFront: (params) => dispatch(reqFilterDateFront(params)),
  // reqCancelFilterDate: (params) => dispatch(reqCancelFilterDate(params)),

  reqSortTitleFront: (params) => dispatch(reqSortTitleFront(params)),
  // reqCancelSortTitle: (params) => dispatch(reqCancelSortTitle(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
