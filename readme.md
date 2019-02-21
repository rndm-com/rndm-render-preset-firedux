# RNDM Render Preset: Firedux

## About

This preset provides functionality for [RNDM Render package](https://github.com/rndm-com/rndm-render) for combined integrations of Firebase and Redux (Firedux!).

It includes the following packages:

- [@rndm/render-preset-core](https://github.com/rndm-com/rndm-render-preset-core)
- [@rndm/render-plugin-firebase](https://github.com/rndm-com/rndm-render-plugin-firebase)
- [@rndm/render-plugin-redux](https://github.com/rndm-com/rndm-render-plugin-redux)

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://github.com/rndm-com/rndm-render) package.
=======
# [RNDM](https://www.rndm.com) Render Preset: Firedux

## About

This preset provides functionality for [RNDM Render package](https://www.rndm.com/docs/rndm-render) for combined integrations of Firebase and Redux (Firedux!).

It includes the following packages:

- [@rndm/render-preset-core](https://www.rndm.com/docs/rndm-render/preset/core)
- [@rndm/render-plugin-firebase](https://www.rndm.com/docs/rndm-render/plugin/firebase)
- [@rndm/render-plugin-redux](https://www.rndm.com/docs/rndm-render/plugin/redux)

## Installation

If you have not already done so, then please ensure you have installed the [RNDM Render](https://www.rndm.com/docs/rndm-render) package.
>>>>>>> 65f3fb9886e3f3abd255e7543917a367538769c5

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

Within this component, you are able to access your Firebase data either through the Database or Firestore. Each of these paradigms gives you different pros and cons, and we would whole-heartedly recommend you review the options within the Firebase architecture to determine your preferred mechganism for persisting your data.

##### With Database

The Database option is the original JSON bases database system created with Firebase. It is extremely responsive and greate for persisitng simplistic JSON objects, such as light-weight views or small amounts of data. When used, it should be noted that there is a limit of 32 leves of depth, so complext or deep view structures can be rejected at the time of trying to persist. In a number of ways, the [RNDM Builder](https://www.rndm.com/docs/render/plugin/builder) plugin assists in reducing the overhead of this. However, if you require your API to go beyopnd this depth, then you will need to review the Firestore option.

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
                      "default": {
                        "type": "RNDM.Empty"
                      }
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

##### With Firestore

Firestore is the modern update to the Firebase data persistence tooling. It is a real-time, queryable NoSQL database which can contain documents of up to 1MB in size. This option allows for a greater amount of flexibility with your approach to the persistance model opf your real-time application

There are two different options with regards to the Firestore:

**observe:** This is a boolean value that allows you to determine whether you wish the element to observe for changes in the data, or to fetch for one time only.

**queries:** This is an array of queries that can be passed into your element to allow for multiple documents being determined. For full documetnation around these, we recommeend reading through the [Firebase](https://firebase.google.com/docs/firestore/query-data/queries) documentation around querying.

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
        "observer": "firestore",
        "reference": "collection/document",
        "path": "test.view",
        "observe": true,
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
                      "default": {
                         "type": "RNDM.Empty"
                       }
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

The above example will fetch the document called 'document' from a collection called 'collection', and observe it for any changes.

**Example 2**

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
        "observer": "firestore",
        "reference": "collection0/document/collection1",
        "path": "test.view",
        "queries": [
          [
            "type",
            "==",
            "react-native.View"
          ]
        ],
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
                      "default": {
                         "type": "RNDM.Empty"
                       }
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

The above example will look under the collection1 which is a collection within the document under collection0 and query it to find any documents where the type of the first element is equal to 'react-native.View'.

#### Firestore Component

The Firestore Component allows your application to directly access the Firestore without serialisation.

**Example**

```javascript
import React from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Firestore } from '@rndm/render-preset-firedux';

const app = firebase.initializeApp({ databaseURL: 'https://rndm-com.firebaseio.com' }, 'myApp');

const MyView = () => (
    <View
        style={{
            padding: 10,
        }}
    >
        <Firestore app={app} path='collection.document' onResponse={() => console.log('Success')} />
    </View>
);

export default MyView;

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

Check out the [Playground](https://www.rndm.com/playground) page to see how these features work.
