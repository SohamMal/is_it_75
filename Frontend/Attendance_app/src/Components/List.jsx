import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function List() {
    const [dataArray, setDataArray] = useState([]);
    const location = useLocation();
    const [subjectName, setSubjectName] = useState('');

    async function handleDelete(subject_name, date, present){
        const responseBody={
            subject_name,
            date,
            present
        }
        const response=await fetch('http://localhost:3000/delete',{
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'token':localStorage.getItem('token')
            },
            body: JSON.stringify(responseBody)
        })

        const value=await response.json();

        fetch(`http://localhost:3000/viewall?subject_name=${subjectName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token:localStorage.getItem('token')
                }
            })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const value = await response.json();
                setDataArray(value.finalList);
            })
            .catch(error => {
                console.error('Error:', error);
                setDataArray([]); // Clear data array on error
        });
    }

    useEffect(() => {
        setSubjectName(location.state ? location.state.subject_name : '');
    }, [location.state]);

    useEffect(() => {
        if (subjectName) {
            fetch(`http://localhost:3000/viewall?subject_name=${subjectName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token:localStorage.getItem('token')
                }
            })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const value = await response.json();
                const msg=value.msg;
                if(msg==`Not Signed In`){
                    navigate('/');
                }
                setDataArray(value.finalList);
            })
            .catch(error => {
                console.error('Error:', error);
                setDataArray([]); // Clear data array on error
            });
        }
    }, [subjectName]);

    return (
        <div>
            {dataArray.length === 0 ? (
                <p>No data available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Subject Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataArray.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.subject_name}</td>
                                <td>{item.date}</td>
                                <td>{item.present ? 'Present' : 'Absent'}</td>
                                <td><button className="delete" onClick={
                                    ()=>{
                                        handleDelete(item.subject_name, item.date, item.present);
                                    }
                                }><i className="fa-solid fa-trash fa-lg"></i></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
