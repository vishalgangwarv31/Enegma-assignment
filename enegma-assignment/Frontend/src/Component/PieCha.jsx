import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChar = ({ requests }) => {
  const processData = (requests) => {
    const userAgentCounts = requests.reduce((acc, req) => {
      const userAgent = req.user_agent;
      if (acc[userAgent]) {
        acc[userAgent] += 1;
      } else {
        acc[userAgent] = 1;
      }
      return acc;
    }, {});

    return Object.keys(userAgentCounts).map(userAgent => ({
      name: userAgent,
      value: userAgentCounts[userAgent]
    }));
  };

  const data1 = processData(requests);
  const labels = data1.map(item => item.name);
  const values = data1.map(item => item.value);

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#8a4baf', '#ff4181', '#36a2eb', '#ffcd56', '#4bc0c0', '#ff9f40'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
    cutout: '60%',
  };

  return (
    <div className='piechart-container'>
      <h3 className='user-name'>Browser</h3>
      <p className='user-position'>No of requests by browser</p>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default PieChar;
