import { Base } from '@rndm/render-plugin-firebase';
import { identity, set } from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';

const dispatch = {
  dispatch: identity
};

class Redux extends Base {

  static DEFAULT_TYPE = 'RNDM_DID_UPDATE_LAYOUT';

  onValue = (snap) => {
    const { path, type = Redux.DEFAULT_TYPE } = this.state;
    const { dispatch } = this.props;
    const views = snap.val();
    if (views) {
      dispatch(set({ type }, path, views));
    } else {
      this.offValue();
    }
  };
  offValue = () => {
    const { dispatch } = this.props;
    const { path, type = Redux.DEFAULT_TYPE } = this.state;
    dispatch(set({ type }, path, null));
  };

  updateReference = () => {
    const { reference, path, name } = this.state;
    try {
      if (!reference || !path) return;
      firebase.app(name).database().ref(reference).on('value', this.onValue);
    } catch (_) {
      this.offValue();
    }
  };

  render() {
    return this.props.children;
  }
}

export default connect(null, dispatch)(Redux);
