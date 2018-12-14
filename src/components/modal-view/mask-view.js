import React, { Component } from 'react';
import ModalView from './modal-view';

let _modalRef;
export default class MaskView extends Component {
  render() {
    const wrapperStyle = { borderRadius: 5 };
    return (
      <ModalView
        ref={ref => { _modalRef = ref; }}
        style={wrapperStyle}
      />
    );
  }
}

// function handleValueChange(args, d) {
//   _modalRef.setModalVisible(false);
//   if (args.onValueChange) args.onValueChange(d);
// }

// function handleCancel(args) {
//   _modalRef.setModalVisible(false);
//   if (args.onCancel) args.onCancel();
// }

MaskView.Show = {
  get modal() {
    return _modalRef;
  },

  updateChild: props => {
    _modalRef.updateChild(props);
  },

  render(elements, props = {}) {
    if (!_modalRef) return;
    _modalRef.setState({
      ..._modalRef.state,
      ...props
    });
    _modalRef.renderContent(elements);
  },

  close() {
    _modalRef.setModalVisible(false);
  },
};
