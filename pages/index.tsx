/* pages/index.tsx */

import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import Layout from '../components/Layout';
import Poll from '../components/Poll';
import Stats from '../components/Stats';
import '../styles/tailwind-theme.css';

export interface IIndexPageProps {
  question: string;
  choices: Array<string>;
}

export interface IIndexPageState {
  answers: { [choice: string]: number };
  darkMode: boolean;
}

class IndexPage extends Component<IIndexPageProps, IIndexPageState> {
  private pusher: any;

  constructor(props: IIndexPageProps) {
    super(props);

    this.state = {
      answers: props.choices.reduce(
        (object, key) => ({ ...object, [key]: 0 }),
        {}
      ),
      darkMode: false
    };
  }

  setColorScheme = () => {
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? this.setState({ darkMode: true })
      : this.setState({ darkMode: false });
  };

  componentDidMount() {
    this.setColorScheme();

    this.pusher = new Pusher(
      process.env.PUSHER_APP_KEY
        ? process.env.PUSHER_APP_KEY
        : 'insert_your_key_here',
      {
        cluster: process.env.PUSHER_APP_CLUSTER,
        encrypted: true
      }
    );

    const channel = this.pusher.subscribe('poll-board');

    channel.bind(
      'new-answer',
      ({ choice, count }: { choice: string; count: number }) => {
        let { answers } = this.state;
        answers = { ...answers, [choice]: count };
        this.setState({ answers });
      }
    );

    this.pusher.connection.bind('connected', () => {
      axios.post('/answers').then(response => {
        const answers = response.data.answers;
        this.setState({ answers });
      });
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(this.setColorScheme.bind(this));

    window
      .matchMedia('(prefers-color-scheme: light)')
      .addListener(this.setColorScheme.bind(this));
  }

  componentWillUnmount() {
    this.pusher.disconnect();
  }

  public render() {
    const { question = '', choices = [] } = this.props;

    return (
      <Layout pageTitle='Live Polls App'>
        <div className='flex flex-wrap h-screen lg:w-screen lg:h-screen'>
          <Poll
            question={question}
            choices={choices}
            darkMode={this.state.darkMode}
          />
          <Stats
            choices={choices}
            stats={this.state.answers}
            darkMode={this.state.darkMode}
          />
        </div>
      </Layout>
    );
  }
}

export default () => (
  <Fragment>
    <IndexPage
      question={'Which is the largest continent in the world by population?'}
      choices={['Africa', 'Asia', 'Europe', 'North America', 'South America']}
    />
  </Fragment>
);
