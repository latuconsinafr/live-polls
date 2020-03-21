/* components/Poll.tsx */

import { Component, Fragment, MouseEvent } from 'react';
import axios from 'axios';

export interface IPollProps {
  question: string;
  choices: Array<string>;
  darkMode: boolean;
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
    const { question = '', choices = [], darkMode = false } = this.props;

    return (
      <Fragment>
        <div className='w-full h-full lg:w-1/2 flex flex-col items-center justify-center border-r-2 border-gray-300 bg-gray-200 dark-mode:bg-gray-800 dark-mode:border-gray-700'>
          <div className='p-5'>
            {darkMode ? (
              <button type='button' className='text-blue-300'>☾</button>
            ) : (
              <button type='button'>☀</button>
            )}
          </div>
          <div className='p-10'>
            <h3 className='uppercase tracking-tight'>Poll for the Day</h3>

            <p className='font-semibold mt-2 text-lg dark-mode:text-white'>
              {question}
            </p>

            <div className='p-5'>
              {choices.map((choice, index) => {
                const selected =
                  selectedChoice != '' && selectedChoice === choice;

                const labelClass = [
                  'bg-transparent text-gray-500 text-lg font-medium cursor-pointer pl-5 position-relative',
                  selected ? 'checked' : ''
                ].join(' ');

                return (
                  <div
                    key={index}
                    className='custom-control custom-radio py-3 ml-2 d-flex align-items-center'
                  >
                    <input
                      className='form-radio bg-gray-400 h-5 w-5'
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
              className={`bg-blue-500 hover:bg-blue-400 hover:border-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 rounded ${
                selectedChoice
                  ? 'opacity-100 cursor-allowed'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!selectedChoice}
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
