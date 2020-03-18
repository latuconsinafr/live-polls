/* components/Stats.tsx */

import { Fragment, FunctionComponent } from 'react';
import { Line } from 'react-chartjs-2';

interface IStatsProps {
  choices: Array<string>;
  stats: { [choice: string]: number };
}

const Stats: FunctionComponent<IStatsProps> = props => {
  const { choices = [], stats = {} } = props;
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
    layout: { padding: { top: 25, bottom: 75, left: 75, right: 75 } },
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
      fontColor: '#677'
    }
  };

  return (
    <Fragment>
      <div>
        <Line data={chartData} width={100} height={50} options={chartOptions} />
      </div>

      <div>
        <div>
          <span>Total Count</span>
          <span>{totalCount}</span>
        </div>

        <div>
          {counts.map((count, index) => {
            return (
              <div key={index}>
                <span>{count}</span>
              </div>
            );
          })}
        </div>

        <div>
          {choices.map((choice, index) => {
            return (
              <div key={index}>
                <span>{choice}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default Stats;
