/* components/Poll.tsx */

import { Component, Fragment, MouseEvent } from 'react';
import axios from 'axios';

export interface IPollProps {
  question: string;
  choices: Array<string>;
}

export interface IPollState {
  selected: string;
}

export default class Poll extends Component<IPollProps, IPollState> {
  constructor(props: IPollProps) {
    super(props);

    this.state = {
      selected: ''
    };
  }

  private handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    axios.post('/answer', { choice: this.state.selected });
    this.setState({ selected: '' });
  };

  private handleClick = (selected: string) => (
    event: MouseEvent<HTMLLabelElement>
  ) => {
    this.setState({ selected });
  };

  public render() {
    const { selected: selectedChoice } = this.state;
    const { question = null, choices = [] } = this.props;

    return (
      <Fragment>
        <span>Poll for the Day</span>

        <span>{question}</span>

        <div>
          {choices.map((choice, index) => {
            const selected = selectedChoice != '' && selectedChoice === choice;

            return (
              <div
                key={index}
              >
                <input
                  type='radio'
                  name='poll-response'
                  id={`poll-response--radio-${index + 1}`}
                  value={choice}
                  checked={selected}
                  readOnly
                />

                <label
                  htmlFor={`poll-response--radio-${index + 1}`}
                  onClick={this.handleClick(choice)}
                >
                  {choice}
                </label>
              </div>
            );
          })}
        </div>

        <button
          type='button'
          disabled={!selectedChoice}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </Fragment>
    );
  }
}
