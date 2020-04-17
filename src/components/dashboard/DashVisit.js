import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import Axios from 'axios';

class DashVisit extends Component {
    constructor(){
        super();
        this.state = {
            line1: [],
            line2: [],
            W: null,
            H: null,
        }
    }

    componentDidMount(){

        Axios.get('http://localhost:4200/api/total/all')
        .then(response => {
            
            let data = response.data;
            let a = [];

            for(const dataVal of data){

                let line = {Name: dataVal.Date, 
                            Total: dataVal.TotalCount,
                            Unique: dataVal.UniqueVisit,
                            amt: 2400}
                
                a.push(line);
            
            }

            this.setState({line1: a}, () =>  {

                const containerChart = document.getElementById('containerChart')

                let chartH = containerChart.clientHeight;
                let chartW = containerChart.clientWidth;

                let H = (chartH * 90) / 100;
                let W = (chartW * 95) / 100;

                this.setState({W: W, H: H})

                window.onresize = () => {

                    let chartH = containerChart.clientHeight;
                    let chartW = containerChart.clientWidth;

                    let H = (chartH * 90) / 100;
                    let W = (chartW * 95) / 100;

                    this.setState({W: W, H: H})

                }

            })


        })
        .catch(err => console.log(err))

    }

  render() {
    return (
        <div id='containerChart'>
            <h3>Visit on the site</h3>
            <ResponsiveContainer width='100%' height='85%'>
                <AreaChart id='chart' data={this.state.line1} margin={{ top: 30, right: 20, bottom: 10, left: 10 }}>
                    <defs>
                        <linearGradient id="colorUv" gradientTransform='rotate(10)'>
                            <stop offset="0%" stopColor="#29f39a" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#0db6dd" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="colorPv" gradientTransform='rotate(10)'>
                            <stop offset="0%" stopColor="#43a7f2" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#833ef5" stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="Total" stroke="#fff" strokeWidth='3' fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="Unique" stroke="#fff" strokeWidth='3' fill="url(#colorPv)" />
                    <XAxis dataKey="Name" height={25} axisLine={false} tick={{stroke: '#205082', fontSize: 12}} tickSize={8}/>
                    <YAxis axisLine={false} padding={{ bottom: 10 }} tick={{stroke: '#205082', fontSize: 12}} tickSize={8}/>
                    <Tooltip itemStyle={{color: '#205082',
                                         fontSize: '0.8em',
                                         fontStyle: 'italic',
                                         fontWeight: '600'}}
                                labelStyle={{color: '#2e2d35',
                                            fontSize: '0.9em',
                                            fontWeight: '600',
                                            marginBottom: '10px'}}
                                contentStyle={{borderRadius: '20px',
                                                padding: '10px 20px',
                                                boxShadow: '0px 0px 20px 0px #EBEAF3'}}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
  }
}

export default DashVisit;
