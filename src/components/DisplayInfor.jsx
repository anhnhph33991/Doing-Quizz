import React from "react";

class DisplayInfor extends React.Component {
    render() {

        const {name, age} = this.props

        return (
            <div>
                <div>My name's {name}</div>
                <div>My name's {age}</div>
            </div>
        )
    }
}

export default DisplayInfor