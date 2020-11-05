import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as getUserAcions from '../actions/getUserActions';
import * as ScrumPointActions from '../actions/ScrumPointsActions';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import moment from "moment"

const data = [
    {
        name: 'Jan', uv: 3500,
    },
    {
        name: 'Feb', uv: 3000,
    },
    {
        name: 'Mar', uv: 2000,
    },
];
const scrumPointsTo = moment(moment()).subtract(0,'months').endOf('month').format('YYYY-MM-DD'); 
const scrumPointsFrom = moment(moment()).subtract(2,'months').startOf('month').format('YYYY-MM-DD'); 
var firstMonPoints = 0, secondMonPoints = 0, thirdMonPoints = 0;
var firstMonName = "", secondMonName = "", thirdMonName = "";
firstMonName = moment().subtract(2, "month").format('MMMM');
secondMonName = moment().subtract(1, "month").format('MMMM');
thirdMonName = moment().subtract(0, "month").format('MMMM');

class IndivisualGraph extends React.Component {
    componentDidMount() {
         this.props.ScrumPointActions.getUserScrumPoints(this.props.userId,scrumPointsFrom,scrumPointsTo);
    }
    render() {
        console.log(this.props);
        if(this.props.userScrumPoints.length === 0) return null; 
        var userScrumPoints = this.props.userScrumPoints;
        var scrumPointsData = [];
        userScrumPoints.map((userPoints) => {
            var month =  moment(userPoints.created_at).month() + 1;
            if(moment(scrumPointsFrom).month() + 1 === month)
                firstMonPoints = firstMonPoints + userPoints.point;
            else if(moment(scrumPointsFrom).month() + 2 === month)
                secondMonPoints = secondMonPoints + userPoints.point;
            else if(moment(scrumPointsTo).month() + 1 === month)
                thirdMonPoints = thirdMonPoints + userPoints.point;

        })
        scrumPointsData.push({monthName: firstMonName, points:firstMonPoints });
        scrumPointsData.push({monthName: secondMonName, points:secondMonPoints });
        scrumPointsData.push({monthName: thirdMonName, points:thirdMonPoints });
        
        return (
            <ResponsiveContainer aspect={4.0 / 3.0} width='100%'>
                <BarChart
                    // width='100 %'
                    // height={300}
                    data={scrumPointsData}
                    margin={{
                        top: 6, left: 11, bottom: 5,
                    }}
                >
                    <XAxis dataKey="monthName" />
                    <YAxis label={{ value: 'Points', angle: -90, position: 'left', color: '#666' }} />
                    <Tooltip />
                    <Bar dataKey="points" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        userList: state.userList,
        userScrumPoints: state.userScrumPoints, 
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserAcions: bindActionCreators(getUserAcions, dispatch),
        ScrumPointActions: bindActionCreators(ScrumPointActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndivisualGraph)
