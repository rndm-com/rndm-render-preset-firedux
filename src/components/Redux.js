import { Base } from '@rndm/render-plugin-firebase';
import { identity, set } from 'lodash';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { FIRESTORE, DATABASE } from './_constants/OBSERVERS';

const dispatch = {
  dispatch: identity
};

class Redux extends Base {

  static DEFAULT_TYPE = 'RNDM_DID_UPDATE_LAYOUT';

  onValue = (observer, queried) => (snap) => {
    const { path, type = Redux.DEFAULT_TYPE } = this.state;
    const { dispatch } = this.props;
    const views = observer === DATABASE ? snap.val() : queried ? snap.map(i => i.data()) : snap.data();
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
    const { reference, path, name, queries, observer = DATABASE, observe } = this.state;
    try {
      if (!reference || !path) return;
      const app = firebase.app(name);

      switch (observer) {
        case DATABASE: {
          app.database().ref(reference).on('value', this.onValue(observer));
          break;
        }

        case FIRESTORE: {
          const endpoint = reference.split('/').reduce((o, i, idx) => {
            const k = idx % 2 === 0 ? 'collection' : 'doc';
            return o[k](i);
          }, app.firestore());

          if (!endpoint) return;

          const docs = (queries || []).reduce((o, i) => o.where(...i), endpoint);

          switch (observe) {
            case true:
              docs.onSnapshot(this.onValue(observer, !!queries), this.offValue);
              break;

            default:
              docs.get().then(this.onValue(observer, !!queries)).catch(this.offValue);
              break;
          }
          break;
        }
      }

    } catch (_) {
      this.offValue();
    }
  };

  render() {
    return this.props.children;
  }
}

export default connect(null, dispatch)(Redux);
