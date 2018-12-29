import React from 'react'
import fetch from "isomorphic-unfetch";
import {Line} from "react-chartjs-2";
import _ from 'lodash'
import format from 'date-format';

function createChartsDataset(timeSeries, label, borderColor) {
    const zippedTimeseries = _.zip.apply(_, timeSeries);
    const dates = zippedTimeseries[0].map(t=>format('yyyy.MM.dd', new Date(t)));
    const txCnt = zippedTimeseries[1];
    return {
        labels: dates,
        dataset: {
            data: txCnt,
            label,
            borderColor,
            fill: false
        }
    }
}

const TxsChart = (props) => {
    const domain = createChartsDataset(props.timeseriesDomain, "Domain tx count", "#3e95cd");
    const pool = createChartsDataset(props.timeseriesPool, "Pool tx count", "#cd4639");
    const config = createChartsDataset(props.timeseriesConfig, "Config tx count", "#3dcd34");
    const data = {
        labels: domain.labels,
        datasets: [
            domain.dataset,
            pool.dataset,
            config.dataset,
        ]
    };
    return (
        <Line data={data}/>
    )
};

export default TxsChart