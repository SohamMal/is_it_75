import { Card } from "./Class"

export function ClassList(){
    return (
        <div className="card-container">
            <Card Name={"OOP"}/>
            <Card Name={"DBMS"}/>
            <Card Name={"DMS"}/>
            <Card Name={"EVS"} />
            <Card Name={"SSOS"}/>
            <Card Name={"MPMC"}/>
        </div>
    )
}