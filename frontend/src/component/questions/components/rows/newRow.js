import React from "react";

export class NewRow extends React.Component {
  render() {
    var onSaveEvent = this.props.onSaveEvent;
    let cellChange = this.props.onCellChange;

    return (
      <tr>
        <td>
          <input
            type="text"
            name="_id"
            value={this.props._id}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <input
            type="text"
            name="ques"
            value={this.props.ques}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <input
            type="text"
            name="options"
            value={this.props.options}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <input
            type="text"
            name="ans"
            value={this.props.ans}
            onChange={cellChange}
            className="input"
          />
        </td>
        <td>
          <i className="material-icons" onClick={onSaveEvent} style={{ cursor: 'pointer' }}>add_circle</i>
        </td>
      </tr>
    );
  }
}
