import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function Covid19() {

    const [data, setData] = useState([])
    const [inputValue, setInputValue] = useState("")

    const handleChange = (event) => {
        setInputValue(event.target.value)
        console.log(event.target.value)
    }

    const getCovidData = async () => {
        const covidResponseData = await fetch('https://coronavirus-19-api.herokuapp.com/countries?fbclid=IwAR258aqkSrZIN6Z6lr0vi1brTozpO_i-lFG_PvtvsIVo0y1XXic7D8WEjNQ');
        const jsonResponse = await covidResponseData.json();
        console.log(jsonResponse)
        setData(jsonResponse)
    }

    useEffect(() => {
        getCovidData()
    }, [])
    return (
        <>
            <div className="flex flex-row items-center">
            <span className="w-5 h-5 rounded-full bg-red-600 ml-5 animate-ping"></span>
                <span className="text-3xl text-blue-400 font-bold p-4 text-left flex-grow ">Live Covid 19 Tracker</span>
                <input className="border-none outline-none bg-blue-100 p-5 rounded-lg mr-5 mt-2" type="text" placeholder="Search any country" value={inputValue} onChange={handleChange} />
            </div>

            <div className="p-5 m-5 box-border bg-gray-200 shadow-lg rounded-lg">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">Cases</TableCell>
                                <TableCell align="left">Today Cases</TableCell>
                                <TableCell align="center">Deaths</TableCell>
                                <TableCell align="center">Today Deaths</TableCell>
                                <TableCell align="center">Recovered</TableCell>
                                <TableCell align="center">Active</TableCell>
                                <TableCell align="center">Critical</TableCell>
                                <TableCell align="center">CasesPerOneMillion</TableCell>
                                <TableCell align="center">DeathsPerOneMillion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.filter((val) => {
                                if (inputValue === "") {
                                    return val
                                } 
                                else if (val.country.includes(inputValue)){
                                    return val
                                }

                            }).map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {item.country}
                                        </TableCell>
                                        <TableCell align="right">{item.cases}</TableCell>
                                        <TableCell align="right">{item.todayCases}</TableCell>
                                        <TableCell align="right">{item.deaths}</TableCell>
                                        <TableCell align="right">{item.todayDeaths}</TableCell>
                                        <TableCell align="right">{item.recovered}</TableCell>
                                        <TableCell align="right">{item.active}</TableCell>
                                        <TableCell align="right">{item.critical}</TableCell>
                                        <TableCell align="right">{item.casesPerOneMillion}</TableCell>
                                        <TableCell align="right">{item.deathsPerOneMillion}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {data.map( (item) => {
                return(
                    <>
                   <h1>{item.country}</h1>
                   <table>

                   </table>
                   </>
                  
                )
            })} */}
            </div>

        </>
    );
}

export default Covid19;