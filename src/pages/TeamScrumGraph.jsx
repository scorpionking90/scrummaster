import React, { PureComponent } from 'react';
import {
    PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as getUserAcions from '../actions/getUserActions';
import * as ScrumPointActions from '../actions/ScrumPointsActions';
import * as teamsActions from '../actions/TeamsActions';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

class TeamScrumGraph extends React.Component {
    componentDidMount() {
        // this.props.ScrumPointActions.getScrumPoints();
        this.props.teamsActions.getTeamScrumPoints();
    }

    render() {
        console.log('TeamsGraph', this.props.teamScrumPoints)
        const teamScrumPoints = this.props.teamScrumPoints;
        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
        let teamScrumPointsCombined = {};
        
        // var teamScrumPointsCombined = teamScrumPoints.reduce(function (res, val) {
        //     res[val.associate.associate_id] = res[val.associate.associate_id] || [];
        //     res[val.associate.associate_id].push(val);
        //     return res;
        // }, Object.create(null));
        // console.log(teamScrumPointsCombined)
        console.log("teamScrumPoints",teamScrumPoints);

        teamScrumPoints.forEach((i) => {
            teamScrumPointsCombined[i.associate.associate_id] = teamScrumPointsCombined[i.associate.associate_id] || { associate_name: i.associate.name, point: 0 };
            teamScrumPointsCombined[i.associate.associate_id].point += i.point;
          });
          
          teamScrumPointsCombined = Object.values(teamScrumPointsCombined)
        //   console.log(teamScrumPointsCombined);
        
        return (
            <ResponsiveContainer aspect={4.0 / 3.0} width='100%'>
            <PieChart width={100} height={100}>
                <Pie data={teamScrumPointsCombined} color="#000000" dataKey="point" nameKey="associate_name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" >
                    {
                        teamScrumPointsCombined.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                    }
                </Pie>
                {/* <Tooltip content={<CustomTooltip />} /> */}
                <Legend />
            </PieChart>
            </ResponsiveContainer>
        );
      }
    }

function mapStateToProps(state) {
    return {
       // scrumPoints: state.scrumPoints, 
        teamScrumPoints: state.teamScrumPoints,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        //ScrumPointActions: bindActionCreators(ScrumPointActions, dispatch),
        teamsActions: bindActionCreators(teamsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamScrumGraph)