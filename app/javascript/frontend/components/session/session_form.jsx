import React from "react";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { formType } = this.props;
    return (
      <div className="session-form">
        <h2>This is the {formType} form!</h2>
      </div>
    );
  }
}

export default SessionForm;
