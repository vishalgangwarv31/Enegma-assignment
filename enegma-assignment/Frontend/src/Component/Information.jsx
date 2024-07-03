import {Antenna , Hourglass ,ShieldX } from 'lucide-react'

const Information = ({requests}) =>{    
    const length = requests.length
    
    return(
        <div className='dashboard'>   
            <TotalRequest length={length}/>
            <AvgResponse/>
            <FailedReq/>
        </div>
    )
}

const TotalRequest = ({length}) => {
    const reqs = length;
    return (
        <div className="req-container">
            <div className="req-icon">
                <Antenna />
            </div>
            <div className="req-info">
                <p className="req-heading">Total Request</p>
                <p className="req-number">{reqs}</p>
            </div>
        </div>
    );
};

const AvgResponse = () => {
    const resp = 37; 
    return (
        <div className="req-container">
            <div className="res-icon">
            <Hourglass />
            </div>
            <div className="req-info">
                <p className="req-heading">Avg. Response Time</p>
                <p className="req-number">{resp}ms</p>
            </div>
        </div>
    );
};

const FailedReq = () => {
    const Fail = 0;
    return (
        <div className="req-container">
            <div className="fail-icon">
            <ShieldX />
            </div>
            <div className="req-info">
                <p className="req-heading">Failed Request</p>
                <p className="req-number">{Fail}</p>
            </div>
        </div>
    );
};


export default Information