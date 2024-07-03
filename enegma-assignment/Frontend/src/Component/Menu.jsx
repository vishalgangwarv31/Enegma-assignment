import {Webhook} from 'lucide-react' 

const Menu = ()=>{
    const value = [
        'Dashboard','custumers','Income','Promote','Help'
    ]
    return(
            <div className="menu-container">
                <h1 className="api-heading">API Dashboard</h1>
                <div className="option-container">
                <Options value={value}/>
                
                </div>
                <div className="user-container">
                    <UserCard/>
                </div>
            </div> 
    )
}

const Options = ({value})=>{
    // console.log(value);
    return(
        <div>
            <ul className="list-option">
                {
                    value.map((item) => (
                        <li key={item}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}

const UserCard = ()=>{
    const detail={
        image:'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
        name:'Evano',
        position:'Project Manager'
    }
    
    return(
        <div className="user-detail">
            <img src={detail.image} alt="user image" className="user-image"/>
            <div>
                <p className="user-name">{detail.name}</p>
                <p className="user-position">{detail.position}</p>
            </div>
        </div>
    )
}

export default Menu;