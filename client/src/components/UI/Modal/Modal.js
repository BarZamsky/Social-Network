import React, {Component} from "react"
import "./Modal.scss"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }



    render() {

        const className = this.props.className ? ["Modal", this.props.className].join(' ') : "Modal";
        return (
            <div>
                <Backdrop show={this.props.show} onClick={this.props.onCloseModal}/>
                <div className={className}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Modal;
