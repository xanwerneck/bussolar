import React from "react";
import Menu from "../components/Menu";
import './type.css'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    componentDidMount() {
        
    }
    render() {
        return (
            <>
                <Menu 
                    goLogin={() => this.props.history.push('/login')}
                />
            </>
        )
    }
}