import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Button} from 'reactstrap';
import '../App.css'


class Chart extends React.Component {

    constructor(props) {
        super(props);


        this.filterJson = this.filterJson.bind(this);
        this.refreshOnClick=this.refreshOnClick.bind(this);

        this.state = {

            votingData: this.props.data,
            label: [],
            data: []

        }

    }

    filterJson(data, key) {
        let temp1 = [];
        let temp2 = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].qid == key) {
                temp1.push(data[i].optionvalue);
                temp2.push(data[i].total_votes);
            }

            if (i + 1 == data.length) {

                this.setState({

                    label: temp1,
                    data: temp2
                }
                )
            }
        }



    }

    componentDidMount(props) {

        this.filterJson(this.props.data, this.props.qData);


    }
    refreshOnClick(props)
    {

// this.props.getProducts();
this.filterJson(this.props.data, this.props.qData);
this.props.getVoteCount();


    }



    render() {
        return (
            <div>
               
                {/* <input type="button" style={{marginBottom:"20px"}} onClick={this.refreshOnClick}>RefreshChat</input> */}
                {/* <input type="button" value="refreshchart" onClick={this.refreshOnClick}/> */}
                <Button size="sm"  className="btnAdmin" style={{backgroundColor:"white",color:"black",marginBottom:"30px"}}>   
                <i class="material-icons" onClick={this.refreshOnClick} >
autorenew
</i>
                              </Button>
    
                <Bar
                    data={{
                        labels: this.state.label,
                        datasets: [
                            {
                                label: 'Votes',
                                data: this.state.data,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)'
                                ]
                            }
                        ]
                    }}

                    options={{
                        title: {
                            display: "",
                            text: ' ',
                            fontSize: 12
                        },
                        legend: {
                            display: "",
                            position: ""
                        },
                        scales: {
                            
                            xAxes: [{
                                barPercentage: 0.4
                            
                                
                            }],
                            yAxes: [{
                                
                                ticks: {
                                    beginAtZero: true,
                                    min:0,
                                    max:10
                                   
                                    
                                
                                }
                            }]
                        }
                    }}

                />
            </div>
        )
    }
}



export default Chart;