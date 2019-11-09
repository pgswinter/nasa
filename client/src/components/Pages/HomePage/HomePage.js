import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import debounce from '../../../util/debounce';
// import { debounce } from 'lodash';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

import {
  reqLikeFront,
  reqAddFront,
  reqEditForm,
  reqEditFront,
  reqCancelEdit,
  reqDeleteFront,
  reqFilterFavouriteFront,
  reqCancelFilterFavourite,
  reqSortDateFront,
  reqCancelSortDate,
  reqSearchNasa
} from '../../../actions/nasa/actions';

import InsertModal from '../../Layouts/InsertModal';
import Loading from '../../Layouts/Loading';
import News from '../../Layouts/News';

//import { Test } from './HomePage.styles';

class HomePage extends PureComponent {
  state = {
    inputText: '',
    params: {
      q: '',
      media_type: 'image',
      page: 1
    },
    activeModal: false,
    beforeFilterByFavouriteData: [],
    beforeSortByDateData: [],
  };


  componentDidMount = () => {
    const params = {
      q: 'apollo',
      media_type: 'image',
      page: 1
    };
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

  // *** PROCESS AT FRONTEND
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
  handleSortByDate = () => {
    const { nasaList: { isLoaded, loading, data } } = this.props;
    if (!isLoaded || loading) {
      return <Loading />
    } else {
      this.setState({
        beforeSortByDateData: data
      }, () => {
        this.props.reqSortDateFront();
      })
    }
  }
  handleCancelSortByDate = () => {
    const { beforeSortByDateData } = this.state;
    if (beforeSortByDateData.length > 0) {
      this.props.reqCancelSortDate(beforeSortByDateData);
    }
  }

  // *** RENDER MAIN DATA UI
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

  render() {
    const { activeModal } = this.state;
    const { nasaList } = this.props;
    const {
      isFilteredByFavourite,
      isSortedByDate
    } = nasaList;
    return (
      <div className="homePage">
        <InsertModal
          active={activeModal}
          handleAdd={this.handleAdd}
        />
        <div className={`${activeModal ? 'active' : ''} container`} ref={node => this.node = node}>
          <div className="topHeader">
            <h1><span>nasa</span> Collection</h1>
            <button className="btn btn-add" onClick={() => this.openModal()}>+ Add new item</button>
            <div className="sortBar">
              {
                isFilteredByFavourite ?
                  <button className='btn btn-submit cancel' onClick={() => this.handleCancelFilterFavourite()}>Cancel Filter Favourite</button> :
                  <button className='btn btn-submit' onClick={() => this.handleFilterFavourite()}>Filter Favourite</button>
              }
              {
                isSortedByDate ?
                  <button className='btn btn-submit cancel' onClick={() => this.handleCancelSortByDate()}>Cancel Sort by Date</button> :
                  <button className='btn btn-submit' onClick={() => this.handleSortByDate()}>Sort by Date</button>
              }
            </div>
          </div>

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
  reqCancelSortDate: PropTypes.func,
  reqSortDateFront: PropTypes.func,
  reqFilterFavouriteFront: PropTypes.func,
  reqCancelFilterFavourite: PropTypes.func,
  reqSearchNasa: PropTypes.func,
  reqLikeFront: PropTypes.func,
  reqAddFront: PropTypes.func,
  reqEditForm: PropTypes.func,
  reqCancelEdit: PropTypes.func,
  reqEditFront: PropTypes.func,
  reqDeleteFront: PropTypes.func,
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
  reqFilterFavouriteFront: () => dispatch(reqFilterFavouriteFront()),
  reqCancelFilterFavourite: (params) => dispatch(reqCancelFilterFavourite(params)),
  reqSortDateFront: (params) => dispatch(reqSortDateFront(params)),
  reqCancelSortDate: (params) => dispatch(reqCancelSortDate(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
