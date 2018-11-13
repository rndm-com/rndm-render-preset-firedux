import Redux from './Redux';
import Firebase from './Firebase';

const components = [
  {
    type: 'Dispatcher.Redux',
    value: Redux,
  },
  {
    type: 'Listener.Firebase',
    value: Firebase,
  },
];

export default components;
