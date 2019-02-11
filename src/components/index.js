import Redux from './Redux';
import Firebase from './Firebase';
import Firestore from './Firestore';

const components = [
  {
    type: 'Dispatcher.Redux',
    value: Redux,
  },
  {
    type: 'Listener.Firebase',
    value: Firebase,
  },
  {
    type: 'Listener.Firestore',
    value: Firestore,
  },
];

export default components;
