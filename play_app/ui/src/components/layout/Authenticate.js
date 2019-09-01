import {Component} from 'react';
import {getUser, setUser} from "../../actions/userActions";
import {connect} from "react-redux";

class Authenticate extends Component {

    componentDidMount() {
        this.handleDeleteBlackList()
    }

    async handleDeleteBlackList() {
        await this.props.setUser();
        this.props.history.push("/");
    }

render() {

    return (""
    );
}
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};
const mapDispatchToProps = (dispatch) => ({
    getUser: () => {
        dispatch(getUser())
    },
    setUser: () => {
        dispatch(setUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)

