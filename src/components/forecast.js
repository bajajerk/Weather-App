import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});




class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

        <Paper className="root">
            <Table className="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Temperature</TableCell>
                        <TableCell align="right">Pressure (g)</TableCell>
                        <TableCell align="right">Humidity</TableCell>
                        <TableCell align="right">Weather</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {this.props.weather_report .map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {new Date(row.dt * 1000).toString()}
                            </TableCell>
                            <TableCell align="right">{row.main.temp-273.15}</TableCell>
                            <TableCell align="right">{row.main.pressure}</TableCell>
                            <TableCell align="right">{row.main.humidity}</TableCell>
                            <TableCell align="right">{row.weather[0]['description']}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>

        );
    }
}

export default App;