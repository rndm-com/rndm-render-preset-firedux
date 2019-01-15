# RNDM Render Preset: Firedux

## About

This preset provides functionality for [RNDM Render package](https://github.com/rndm-com/rndm-render) for combined integrations of Firebase and Redux (Firedux!).

It includes the following packages:

- [@rndm/render-preset-core](https://github.com/rndm-com/rndm-render-preset-core)
- [@rndm/render-plugin-firebase](https://github.com/rndm-com/rndm-render-plugin-firebase)
- [@rndm/render-plugin-redux](https://github.com/rndm-com/rndm-render-plugin-redux)

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://github.com/rndm-com/rndm-render) package.

### From NPM

```sh
npm install --save @rndm/render-preset-firedux
```

### Post Installation

In order to allow this plugin to work, it must first be included in your project. You can do this inside your main index file:

```javascript
import '@rndm/render-preset-firedux';
```

## Usage

### Components

#### Firebase.Dispatcher.Redux

The Firedux Plugin contains one additional Component that solves the integration of Firebase with a state based Redux approach (i.e. the views are maintained in the Redux state and changes are propagated to the listening Components)

**Example**

```json
{
  "type": "Firebase.Wrapper.Config",
  "props": {
    "config": {
      "databaseURL": "https://rndm-com.firebaseio.com"
    },
    "children": {
      "type": "Firebase.Dispatcher.Redux",
      "props": {
        "reference": "example",
        "path": "test.view",
        "children": {
          "type": "RNDM.Renderer",
          "props": {
            "middleware": [
              {
                "middleware": "redux.connect",
                "args": [
                  [
                    {
                      "from": "rndm.test.view",
                      "to": "layout",
                      "default": null
                    }
                  ]
                ]
              }
            ]
          }
        }
      }
    }
  }
}
```

#### Firebase Base Extension

The Firebase Component extends the Base Component from the firebase plugin. It has been written to work the setup of of an initialised Firebase application, and handles the updates of any RNDM JSON passed from the Firebase Database.

**Example**

```javascript
import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Firebase } from '@rndm/render-preset-firedux';

const app = firebase.initializeApp({ databaseURL: 'https://rndm-com.firebaseio.com' }, 'myApp');

const MyView = () => (
    <View
        style={{
            padding: 10,
        }}
    >
        <Firebase app={app} path='example' onResponse={() => console.log('Success')} />
    </View>
);

export default MyView;

```

#### Examples

Full examples can be found in the example library found in this project.

https://github.com/rndm-com/rndm-render-preset-firedux/tree/master/examples
