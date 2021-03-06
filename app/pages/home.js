import React, {Component} from 'react';
import "../scss/style.scss";
import TxsChart from "../components/TxChart/TxChart";
import {getTransactions, getTxTimeseries} from "../api-client";
import {getBaseUrl} from '../routing'
import {Grid} from 'semantic-ui-react';
import PageHeader from "../components/PageHeader/PageHeader";
import TxPreviewList from "../components/TxPreviewList/TxPreviewList";
import Footer from '../components/Footer/Footer';

class HomePage extends Component {

    static async getInitialProps({req, query}) {
        const baseUrl = getBaseUrl(req);
        const {network, txType} = query;
        const domainTxs = await getTransactions(baseUrl, network, 'domain', 0, 13);
        const timeseriesDomain = await getTxTimeseries(baseUrl, network, 'domain');
        const timeseriesPool = await getTxTimeseries(baseUrl, network, 'pool');
        const timeseriesConfig = await getTxTimeseries(baseUrl, network, 'config');
        // todo: cache the data...
        return {
            network, txType,
            txs: domainTxs.txs,
            timeseriesDomain: timeseriesDomain.histogram,
            timeseriesPool: timeseriesPool.histogram,
            timeseriesConfig: timeseriesConfig.histogram,
            baseUrl
        }
    }

    render() {
        const {network, baseUrl} = this.props;
        return (
            <Grid>
                <Grid.Row style={{backgroundColor: "white", marginBottom:"-1em"}}>
                    <Grid.Column width={16}>
                        <PageHeader page="home" network={network} baseUrl={baseUrl}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={10} floated='left'>
                        <Grid>
                            <Grid.Row>
                                <Grid.Column>
                                    <TxsChart label="Domain tx count" color="darkcyan" type="domain" timeseries={this.props.timeseriesDomain}/>
                                    <TxsChart label="Pool tx count" color="mediumaquamarine" type="pool" timeseries={this.props.timeseriesPool}/>
                                    <TxsChart label="Config tx count" color="dodgerblue" type="config" timeseries={this.props.timeseriesConfig}/>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                    <Grid.Column width={6} floated='right' style={{paddingLeft:"7em"}}>
                        <Grid.Row centered>
                            <h2>Last domain transactions</h2>
                        </Grid.Row>
                        <Grid.Row centered style={{marginTop:"2em"}}>
                            <Grid.Column>
                                <TxPreviewList txs={this.props.txs} network={network}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Footer/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default HomePage;