import React from 'react';
import { Modal, Utils } from 'tuya-panel-kit';
// import Alert from 'tuya-panel-kit/lib/components/dialog/alert'; // eslint-disable-line
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Strings from '../../i18n';

const { winWidth, winHeight } = Utils.RatioUtils;

class NestedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      dialogVisible: false,
      popupVisible: false,
      onlyLastModalVisible: true,
    };
  }

  _showDialog = () => this.setState({ dialogVisible: true });

  _showPopup = () => this.setState({ popupVisible: true });

  _showModal1 = () => this.setState({ visible1: true });

  _hideModal1 = () => this.setState({ visible1: false });

  _showModal2 = () => this.setState({ visible2: true });

  _hideModal2 = () => this.setState({ visible2: false });

  _hideDialog = (data, { close }) => {
    close(() => this.setState({ dialogVisible: false }));
  };

  _hidePopup = () => this.setState({ popupVisible: false });

  _hideAllModal = () => this.setState({ visible1: false, visible2: false });

  render() {
    start = Strings.getLang('modal_start');
    return (
      <View>
        <TouchableOpacity onPress={this._showModal1} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>{Strings.getLang('modal_first')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ onlyLastModalVisible: !this.state.onlyLastModalVisible })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>
            {this.state.onlyLastModalVisible ? Strings.getLang('modal_start') : Strings.getLang('modal_end')}{Strings.getLang('modal_all_displayed')}
          </Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.visible1}
          onMaskPress={this._hideAllModal}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log(Strings.getLang('modal_first_window_showed'))}
          onHide={() => console.log(Strings.getLang('modal_first_window_disappeared'))}
          onDismiss={() => console.log(Strings.getLang('modal_dismiss_window'))}
        >
          <TouchableOpacity onPress={this._hideModal1} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{Strings.getLang('modal_end_modal')}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this._showDialog} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>点击我测试Dialog</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={this._showPopup} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{Strings.getLang('modal_test_popup')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showModal2} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{Strings.getLang('modal_second')}</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={this.state.visible2}
          onMaskPress={this._hideModal2}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log(Strings.getLang('modal_second_window_showed'))}
          onHide={() => console.log(Strings.getLang('modal_second_window_disappeared'))}
        >
          <View style={{ width: winWidth, height: winHeight, justifyContent: 'center' }}>
            <TouchableOpacity onPress={this._hideModal2} style={styles.buttonStyle}>
              <Text style={styles.textStyle}>{Strings.getLang('modal_end_this')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._hideAllModal} style={styles.buttonStyle}>
              <Text style={styles.textStyle}>{Strings.getLang('modal_end_all')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* <Modal
          visible={this.state.dialogVisible}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log('Dialog显示了')}
          onHide={() => console.log('Dialog消失了')}
        >
          <View style={{ width: winWidth, height: winHeight, justifyContent: 'center' }}>
            <Alert title="标题" subTitle="副标题" confirmText="确认" onConfirm={this._hideDialog} />
          </View>
        </Modal> */}
        <Modal.Countdown
          visible={this.state.popupVisible}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log(Strings.getLang('modal_popup_showed'))}
          onHide={() => console.log(Strings.getLang('modal_popup_disappeared'))}
          value={0}
          onMaskPress={this._hidePopup}
          onValueChange={() => {}}
          onCancel={this._hidePopup}
          onConfirm={this._hidePopup}
          title={Strings.getLang('modal_countdown')}
          cancelText={Strings.getLang('dialog_cancel')}
          confirmText={Strings.getLang('dialog_confirm')}
          hourText={Strings.getLang('modal_hour')}
          minuteText={Strings.getLang('modal_minute')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 44,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NestedModal;
