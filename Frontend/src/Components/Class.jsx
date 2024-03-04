import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Card({ Name}) {
    const navigate=useNavigate();
    const [percentage, setPercentage]=useState(0);

    useEffect(()=>{
        fetch(`https://is-it-75.onrender.com/percentage?subject_name=${Name}`, {
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
                setPercentage(value.percentage);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[])

    return (
        <div className="card">
            <div className="heading">
                <div className="title">
                    <h1>{Name}</h1>
                </div>
                <div className="view" onClick={()=>{
                    navigate('/list', {state: {
                        subject_name:Name
                    }});
                }}>
                    <button><i className="fa-solid fa-list"></i></button>
                </div>
            </div>
            <div className="card-content">
                <div className="percentage">
                    {percentage}%
                </div>
                <div className="add-class">
                    <button onClick={()=>{
                        navigate('/addclass');
                    }}>+</button>
                </div>
            </div>
        </div>
    )
}
