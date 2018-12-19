import { use } from '@rndm/render';
import * as firebase from '@rndm/render-plugin-firebase';
import * as redux from '@rndm/render-plugin-redux';

import components from './components';
import Firebase from './components/Firebase';

const plugin = {
  key: 'Firebase',
  components,
};

use(plugin);

export {
  Firebase,
  firebase,
  redux,
};

export default plugin;
