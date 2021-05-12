import { Route, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import MentalHealth from "../mentalhealth";
import Approval from "../approvals";
function Index(props) {
    const isAdmin = useSelector((state) => state.user.currentUser.is_admin);

    if (!isAdmin) {
        return <Route component={MentalHealth} />;
    }

    return <Route component={Approval} />;
}

export default withRouter(Index);
