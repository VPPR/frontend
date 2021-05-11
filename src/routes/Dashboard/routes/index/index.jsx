import { Route, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import MentalHealth from "../mentalhealth";
function Index(props) {
    const isAdmin = useSelector((state) => state.user.currentUser.is_admin);

    if (!isAdmin) {
        return <Route component={MentalHealth} />;
    }

    return <Route render={() => <div>To be added</div>} />;
}

export default withRouter(Index);
