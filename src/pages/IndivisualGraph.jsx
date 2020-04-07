import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as getUserAcions from '../actions/getUserActions';
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

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

class IndivisualGraph extends React.Component {
    render() {
        console.log(this.props);
        return (
            <ResponsiveContainer aspect={4.0 / 3.0} width='100%'>
                <BarChart
                    // width='100 %'
                    // height={300}
                    data={data}
                    margin={{
                        top: 6, left: 11, bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Points', angle: -90, position: 'left', color: '#666' }} />
                    <Tooltip />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

function mapStateToProps(state) {
    return {
        userList: state.userList,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getUserAcions: bindActionCreators(getUserAcions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndivisualGraph)
