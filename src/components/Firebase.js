import { Component } from 'react';
import { AsyncStorage } from 'react-native';

class Firebase extends Component {

  componentWillMount() {
    this.getCache();
    this.listen();
  }

  getCache = () => {
    const { path, onResponse = noop } = this.props;
    AsyncStorage.getItem(path).then(blob => {
      const json = JSON.parse(blob);
      if (json) onResponse(json);
    });
  };

  setCache = (object) => {
    const { path } = this.props;
    if (object) AsyncStorage.setItem(path, JSON.stringify(object));
  };

  listen = () => {
    const { path, app, onResponse = noop } = this.props;
    app.database().ref(path).on('value', snap => {
      const json = snap.val();
      onResponse(json);
      this.setCache(json);
    });
  };

  render() {
    return this.props.children;
  }
}

export default Firebase;
