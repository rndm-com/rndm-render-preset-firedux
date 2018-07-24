import { Base } from 'rndm-render-plugin-firebase';
import { use } from 'rndm-render/src/index';
import components from './components/index';

const plugin = {
  key: 'Firebase',
  components,
};

use(plugin);

export default plugin;
