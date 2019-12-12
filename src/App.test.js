import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const style = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.66)",
    zIndex: 10000
  },
  content: {
    margin: "0 auto"
  }
};

const Step1 = ({ next }) => (
  <div>
    STEP1<button onClick={next}>Next</button>
  </div>
);
const Step2 = ({ back }) => (
  <div>
    STEP2<button onClick={back}>Back</button>
  </div>
);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      count: 0,
      step: 1
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  back = () => this.setState({ step: 1 });
  next = () => this.setState({ step: 2 });
  // increment = () => this.setState({ count: this.state.count + 1 });
  increment = () => this.forceUpdate();

  // componentDidUpdate() {
  //   setTimeout(() => {
  //     const form = document.querySelector("form");
  //     if (form) {
  //       console.log("Focus!");
  //       form.focus();
  //     }
  //   }, 100);
  // }

  render() {
    const { step, count } = this.state;
    console.log("Render!");
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          style={style}
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <button onClick={this.increment}>++</button>
          <p>Count: {count}</p>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
          {step === 1 && <Step1 next={this.next} />}
          {step === 2 && <Step2 back={this.back} />}
        </Modal>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
