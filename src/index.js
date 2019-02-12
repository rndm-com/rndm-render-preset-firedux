import { use } from '@rndm/render';
import * as firebase from '@rndm/render-plugin-firebase';
import * as redux from '@rndm/render-plugin-redux';

import components from './components';
import Firebase from './components/Firebase';
import Firestore from './components/Firestore';

const plugin = {
  key: 'Firebase',
  components,
};

use(plugin);

export {
  Firebase,
  Firestore,
  firebase,
  redux,
};

export default plugin;
