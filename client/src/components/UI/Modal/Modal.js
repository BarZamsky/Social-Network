import React, {Component} from "react"
import classes from "./Modal.scss"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }



    render() {
        return (
            <div>
                <Backdrop show={this.props.show} onClick={this.props.onCloseModal}/>
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Modal;
