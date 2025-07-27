import { useSelector } from "react-redux";

export default function Header(){
    const user = useSelector(state=>state.userReducer);
    const name = user?.firstName + ' ' + user?.lastName;
    const shortName = user?.firstName.toUpperCase()[0] + user?.lastName.toUpperCase()[0];
    return(
        <div className="app-header">
    <div className="app-logo">
        <i className="fa fa-comments" aria-hidden="true"></i>
          वार्त्ता chat
        </div>
    <div className="app-user-profile">
        <div className="logged-user-name">{name}</div>
        <div className="logged-user-profile-pic">{shortName}</div>
    </div>
</div>
    );
}