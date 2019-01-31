import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { loadMaterials } from './Material';
import { loadWidths } from './Width';
import { loadRequests, saveRequests } from './Request';
import DetailListItem from './DetailListItem'
import AppHeader from './AppHeader.js';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import AddButton from './AddButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialSelect from './MaterialSelect';
import WidthSelect from './WidthSelect';
import PageSelect from './PageSelect';

class RequestForm extends Component {
  constructor(props) {
    super(props);

    const state = {
      open: false,
      menuOpen: false,
      inputMaterial: '',
      inputWidth: '',
      inputPage: 1
    };

    const requests = loadRequests();

    requests.forEach((r, i) => {
      state[`material${i}`] = r.material;
      state[`width${i}`] = r.width;
      state[`page${i}`] = r.page;
      state[`delete${i}`] = false;
    });

    state.count = requests.length;
    this.state = state;

    this.dataForm = React.createRef();
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleRegist = this.handleRegist.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handlePDFClick = this.handlePDFClick.bind(this);
  }

  handleDeleteClick(id, e) {
    this.setState({
      [`delete${id}`]: true
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleAdd() {
    this.setState({ open: true });
  }

  handleMenuOpen(value) {
    this.setState({
      menuOpen: value
    });
  }

  requests(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      if (state[`delete${i}`]) continue;
      const request = {
        material: state[`material${i}`],
        width: state[`width${i}`],
        page: state[`page${i}`]
      };
      result.push(request);
    }
    return result;
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.dataChanged(prevState, this.state)) {
      const requests = this.requests(this.state);
      saveRequests(requests);
    }
  }

  dataChanged(prevState, state) {
    if (prevState.count !== state.count) return true;
    for (let i = 0; i < state.count; i++) {
      if (prevState[`material${i}`] !== state[`material${i}`]) return true;
      if (prevState[`width${i}`] !== state[`width${i}`]) return true;
      if (prevState[`page${i}`] !== state[`page${i}`]) return true;
      if (prevState[`delete${i}`] !== state[`delete${i}`]) return true;
    }
    return false;
  }

  handleRegist() {
    this.setState(state => {
      const newIndex = state.count;
      const newState = {};
      newState[`material${newIndex}`] = state.inputMaterial;
      newState[`width${newIndex}`] = parseInt(state.inputWidth);
      newState[`page${newIndex}`] = parseInt(state.inputPage);
      newState[`delete${newIndex}`] = false;
      newState.count = state.count + 1;

      newState.inputMaterial = '';
      newState.inputWidth = '';
      newState.inputPage = 1;
      newState.open = false;

      return newState;
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handlePDFClick(event) {
    this.dataForm.current.submit();
  }
  getRows(state) {
    const result = [];
    for (let i = 0; i < state.count; i++) {
      result.push({
        material: state[`material${i}`],
        width: state[`width${i}`],
        page: state[`page${i}`],
        delete: state[`delete${i}`]
      });
    }
    return result;
  }

  reqToJSON(requests) {
    return JSON.stringify(
      requests.filter(r => !r.delete));
  }

  render() {
    return (
      <div>
        <Dialog
          fullWidth={true}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">ラベル追加</DialogTitle>
          <DialogContent>
            <MaterialSelect
              value={this.state.inputMaterial}
              onChange={this.handleInputChange} />
            <WidthSelect
              value={this.state.inputWidth}
              onChange={this.handleInputChange} />
            <PageSelect
              value={this.state.inputPage}
              onChange={this.handleInputChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button onClick={this.handleRegist} color="primary">
              登録
            </Button>
          </DialogActions>
        </Dialog>
        <AddButton onClick={this.handleAdd} />

        <AppHeader
          onMenuChange={this.props.onMenuChange}
          title="ラベル編集">
          <IconButton color="inherit" onClick={this.handlePDFClick}>
            <PictureAsPdf />
          </IconButton>
        </AppHeader>

        <RequestList
          requests={this.getRows(this.state)}
          onDeleteClick={this.handleDeleteClick} />

        <form ref={this.dataForm} action="/pdf" method="post" target="_blank">
          <input
            name="requests"
            type="hidden"
            value={this.reqToJSON(this.requests(this.state))} />
        </form>
      </div>
    );
  }
}

class RequestList extends Component {
  componentDidMount() {
    this.materials = loadMaterials();
    this.widths = loadWidths();
  }

  primaryNode(request) {
    const materialStyle = {
      display: 'inline-block', width: '18em'
    };
    const widthStyle = {
      display: 'inline-block', width: '4em', textAlign: 'right'
    };
    const pageStyle = {
      display: 'inline-block', width: '3em', textAlign: 'right'
    };

    return (
      <div>
        <span style={materialStyle}>{request.material}</span>
        <span style={widthStyle}>{`${request.width}巾`}</span>
        <span style={pageStyle}>{`${request.page}枚`}</span>
      </div>);
  }

  render() {
    const requests = this.props.requests;

    const list = requests.map((r, i) => (
      <DetailListItem
        key={i}
        id={`row${i}`}
        primary={this.primaryNode(r)}
        delete={r.delete}
        onDeleteClick={e => this.props.onDeleteClick(i, e)} />
    ));

    return list;
  }
}

export { RequestForm };
