import React from "react";

class DisplayInfor extends React.Component {

    state = {
        isShowListUser: true // set state = true / text luôn mở 
    }


    handleShowHide = () => {
        this.setState({
            isShowListUser: !this.state.isShowListUser // setState: ! Khác với giá trị hiện tại của state
        })
    }

    render() {
        const { listUser } = this.props
        return (
            <div>
                <div>
                    <button className="showHide" onClick={() => this.handleShowHide()}>{this.state.isShowListUser === true ? "Hide list user" : "Show list user"}</button>
                </div>

                { this.state.isShowListUser &&
                    <div>
                        {
                            listUser.map((user) => {
                                return (
                                    <div key={user.id} className={user.age > 19 ? "green" : "red"}>
                                        <div>My name's {user.name}</div>
                                        <div>My age's {user.age}</div>
                                        <hr />
                                    </div>
                                )
                            })
                        }
                    </div>
                }

            </div>
        )
    }
}

export default DisplayInfor