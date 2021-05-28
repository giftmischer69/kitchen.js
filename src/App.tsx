import React from 'react';
import FlexLayout from 'flexlayout-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.global.css';

// TODO: Memento class with decorators

// debug: boolean
const json = {
  global: { tabEnableClose: false },
  borders: [
    {
      type: 'border',
      location: 'bottom',
      size: 100,
      children: [
        {
          type: 'tab',
          name: 'Four',
          component: 'text',
        },
      ],
    },
    {
      type: 'border',
      location: 'left',
      size: 100,
      children: [],
    },
  ],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'One',
            component: 'text',
          },
        ],
      },
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [
          {
            type: 'tab',
            name: 'Two',
            component: 'text',
          },
          {
            type: 'tab',
            name: 'Three',
            component: 'text',
          },
        ],
      },
    ],
  },
};

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
    const component = node.getComponent();
    if (component === 'text') {
      return <div className="panel">Panel {node.getName()}</div>;
    }
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
