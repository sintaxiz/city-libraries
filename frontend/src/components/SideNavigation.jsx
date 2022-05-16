import {Link} from "react-router-dom";
import {Nav, Sidebar} from "grommet";

export default function SideNavigation() {
    return (
        <Sidebar className="sidenav" background="brand" round="small">
            <Nav gap="small">
                <h1>Library Fond</h1>
                <Link to="/libraries">Libraries</Link>
                <Link to="/readers">Readers</Link>
                <Link to="/publications">Publications</Link>
                <Link to="/literature">Literature</Link>
            </Nav>
        </Sidebar>
    )
}