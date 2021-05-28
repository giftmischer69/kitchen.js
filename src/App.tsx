import React from 'react';
import FlexLayout from 'flexlayout-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';

// TODO: Memento class with decorators

// debug: boolean
const json = {
  global: {
    tabEnableFloat: true,
  },
  layout: {
    type: 'row',
    id: '#1',
    children: [
      {
        type: 'tabset',
        id: 'NAVIGATION',
        width: 250,
        // name: 'Navigation',
        enableDeleteWhenEmpty: false,
        children: [
          {
            type: 'tab',
            id: '#2',
            name: 'FX',
            component: 'grid',
            config: {
              id: '1',
            },
          },
        ],
        active: true,
      },
      {
        type: 'row',
        id: '#3',
        weight: 34.81481481481482,
        children: [
          {
            type: 'tabset',
            id: '#4',
            weight: 30.84398976982096,
            children: [
              {
                type: 'tab',
                id: '#5',
                name: 'Pattern',
                component: 'grid',
                config: {
                  id: '2',
                },
              },
            ],
          },
          {
            type: 'tabset',
            id: '#6',
            height: 250,
            // name: 'Blotters',
            enableDeleteWhenEmpty: false,
            children: [
              {
                type: 'tab',
                id: '#7',
                name: 'FZ',
                component: 'grid',
                config: {
                  id: '1',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  borders: [
    {
      type: 'border',
      location: 'bottom',
      size: 100,
      id: '#9',
      children: [
        {
          id: '#8',
          type: 'tab',
          name: 'four',
          component: 'text',
        },
      ],
    },
  ],
};

function ViewPattern() {
  return <div>hello world</div>;
}

export default class Main extends React.Component {
  constructor(props: any) {
    super(props);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.state = { model: FlexLayout.Model.fromJson(json) };
  }

  // eslint-disable-next-line consistent-return,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line consistent-return,class-methods-use-this
  factory(node: any) {
    // const component = node.getComponent();

    if (node.name === 'Pattern') {
      return <div>PATTERN PANEL</div>;
    }

    return <div className="panel">Panel {node.getName()}</div>;
    // if (component === 'text') {
    // }
  }

  render() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
      <FlexLayout.Layout
        /* eslint-disable-next-line react/destructuring-assignment */
        model={this.state.model}
        /* eslint-disable-next-line react/jsx-no-bind */
        factory={this.factory.bind(this)}
      />
    );
  }
}

const Kitchen = () => {
  // const daw = new Daw();

  return (
    <div className="Kitchen">
      <div id="container" />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Kitchen} />
      </Switch>
    </Router>
  );
}
