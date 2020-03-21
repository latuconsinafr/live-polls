/* components/Stats.tsx */

import { Fragment, FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';

interface IStatsProps {
  choices: Array<string>;
  stats: { [choice: string]: number };
  darkMode: boolean;
}

const Stats: FunctionComponent<IStatsProps> = props => {
  const { choices = [], stats = {}, darkMode = false } = props;
  const counts = choices.map(choice => stats[choice] || 0);
  const totalCount = counts.reduce((total, count) => total + count, 0);

  const chartData = {
    labels: choices,
    datasets: [
      {
        lineTension: 0,
        backgroundColor: 'rgba(68, 204, 153, 0.05)',
        borderColor: 'rgba(68, 204, 153, 0.9)',
        borderWidth: 2,
        borderJoinStyle: 'round',
        pointRadius: 5,
        pointBorderColor: '#fff',
        pointBackgroundColor: 'rgba(68, 204, 153, 0.9)',
        pointBorderWidth: 3,
        data: counts
      }
    ]
  };

  const chartOptions = {
    layout: { padding: { top: 0, bottom: 25, left: 125, right: 125 } },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true, display: false }
        }
      ]
    },
    legend: { display: false },
    title: {
      display: true,
      text: 'POLL COUNTS',
      padding: 10,
      lineHeight: 4,
      fontSize: 20,
      fontColor: darkMode ? '#fff' : '#677'
    }
  };

  return (
    <Fragment>
      <div className='w-full h-full lg:w-1/2 grid grid-rows-2 grid-cols-1 dark-mode:bg-gray-900'>
        <div className='items-center row-span-1 col-span-1 border-l-2 border-b-2 border-gray-300 p-2 dark-mode:border-gray-800'>
          <Line
            data={chartData}
            width={50}
            height={50}
            options={chartOptions}
          />
        </div>

        <div className='col-span-1 row-span-1 grid grid-rows-3 grid-cols-1 border-l-2 border-gray-300 dark-mode:border-gray-800'>
          <div className='flex flex-wrap row-span-2 content-center items-center text-center justify-center border-b-2 border-gray-300 dark-mode:border-gray-800'>
            <span className='block w-full uppercase font-bold text-gray-700 dark-mode:text-white'>
              Total Count
            </span>
            <span className='block w-full text-6xl text-gray-800 dark-mode:text-white'>
              {totalCount}
            </span>
          </div>

          <div className='row-span-1 flex flex-wrap'>
            {Object.keys(stats).map((key, index) => {
              return (
                <div
                  key={index}
                  className='w-1/5 grid grid-rows-3 grid-cols-1 text-center'
                >
                  <div className='flex row-span-2 items-center justify-center border border-gray-300 dark-mode:border-gray-800'>
                    <span className='font-bold text-2xl text-gray-800 dark-mode:text-white'>
                      {stats[key]}
                    </span>
                  </div>

                  <div className='flex row-span-1 items-center justify-center border border-gray-300 bg-gray-200 dark-mode:bg-gray-700 dark-mode:border-gray-800'>
                    <span className='font-bold uppercase text-xs text-gray-700 dark-mode:text-white'>
                      {key}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Stats;
