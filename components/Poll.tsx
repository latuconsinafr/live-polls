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
        <span
          className='position-relative d-block w-100 h5 text-uppercase text-primary font-weight-bold mb-4'
          style={{ marginTop: -50 }}
        >
          Poll for the Day
        </span>

        <span className='position-relative d-block w-100 h1 text-dark'>
          {question}
        </span>

        <div className='position-relative my-5 pt-0 pb-5'>
          {choices.map((choice, index) => {
            const selected = selectedChoice != '' && selectedChoice === choice;

            const labelClass = [
              'custom-control-label pl-5 position-relative',
              selected ? 'checked' : ''
            ].join(' ');

            return (
              <div
                key={index}
                className='custom-control custom-radio py-3 ml-2 d-flex align-items-center'
              >
                <input
                  className='custom-control-input'
                  type='radio'
                  name='poll-response'
                  id={`poll-response--radio-${index + 1}`}
                  value={choice}
                  checked={selected}
                  readOnly
                />

                <label
                  className={labelClass}
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
          className={`btn btn-primary text-uppercase my-5 ml-4 px-5 py-3 d-block ${
            selectedChoice ? '' : 'in'
          }visible`}
          disabled={!selectedChoice}
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </Fragment>
    );
  }
}
