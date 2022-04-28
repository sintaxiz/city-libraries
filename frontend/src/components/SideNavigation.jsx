import {Link} from "react-router-dom";

export default function SideNavigation() {
    return (
        <div className="sidenav">
            <h1>Library Fond</h1>
            <Link to="/libraries">Libraries</Link>
            <Link to="/readers">Readers</Link>
            <Link to="/publications">Publications</Link>
            <Link to="/literature">Literature</Link>
        </div>)
}