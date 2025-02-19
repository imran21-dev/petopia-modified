import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const Charts = (campaigns) => {
    const data = campaigns.donations

    return (
        <div className='pt-10 flex justify-center items-center flex-col'>
            <h1 className='text-xl font-bold pb-5 text-center'>Donation Overview</h1>
        <LineChart
          
          width={1000}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={76} />
          <YAxis angle={78} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="maxAmount"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="donatedAmount"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
        </div>

       
         )
};

export default Charts;