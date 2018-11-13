import { Base } from '@rndm/render-plugin-firebase';
import { use } from '@rndm/render';
import components from './components';
import Firebase from './components/Firebase';

const plugin = {
  key: 'Firebase',
  components,
};

use(plugin);

export {
  Firebase,
}

export default plugin;
