import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { withRouter } from 'react-router';
import { noop } from 'lodash';

class Firestore extends Component {
  componentWillMount() {
    // this.getCache();
    this.listen();
  }

  getCache = () => {
    const { path, onResponse = noop } = this.props;
    AsyncStorage.getItem(JSON.stringify(path)).then(blob => {
      const json = JSON.parse(blob);
      if (json) onResponse(json);
    });
  };

  setCache = (object) => {
    const { path } = this.props;
    if (object) AsyncStorage.setItem(path, JSON.stringify(object));
  };

  onDoc = onResponse => doc => {
    try {
      const json = doc.docs ? doc.docs(i => i.data()) : doc.data();
      onResponse(json);
      this.setCache(json);
    } catch(_) {}
  };

  onErr = (e) => console.log(e);

  listen = () => {
    const { path, queries = [], observe = false, app, onResponse = noop } = this.props;

    const endpoint = path.split('/').reduce((o, i, idx) => {
      const k = idx % 2 === 0 ? 'collection' : 'doc';
      return o[k](i);
    }, app.firestore());

    if (!endpoint) return;

    const docs = (queries || []).reduce((o, i) => o.where(...i), endpoint);

    switch (observe) {
      case true:
        docs.onSnapshot(this.onDoc(onResponse), this.onErr);
        break;

      default:
        docs.get().then(this.onDoc(onResponse)).catch(this.onErr);
        break;
    }
  };

  render() {
    return this.props.children;
  }
}

export default Firestore;
