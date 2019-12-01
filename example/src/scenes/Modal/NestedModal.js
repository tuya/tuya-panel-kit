import React from 'react';
import { Modal, Utils } from 'tuya-panel-kit';
import Alert from 'tuya-panel-kit/lib/components/dialog/alert'; // eslint-disable-line
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

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

  _hideDialog = () => this.setState({ dialogVisible: false });

  _hidePopup = () => this.setState({ popupVisible: false });

  _hideAllModal = () => this.setState({ visible1: false, visible2: false });

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this._showModal1} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>点击我开启第一个Modal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.setState({ onlyLastModalVisible: !this.state.onlyLastModalVisible })}
          style={styles.buttonStyle}
        >
          <Text style={styles.textStyle}>
            {this.state.onlyLastModalVisible ? '开启' : '关闭'}所有弹窗同时显示
          </Text>
        </TouchableOpacity>
        <Modal
          visible={this.state.visible1}
          onMaskPress={this._hideAllModal}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log('第一个弹窗显示了')}
          onHide={() => console.log('第一个弹窗消失了')}
        >
          <TouchableOpacity onPress={this._hideModal1} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>点击我或者点击蒙层关闭这个Modal</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showDialog} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>点击我测试Dialog</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showPopup} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>点击我测试Popup</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showModal2} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>点击我开启第二个Modal</Text>
          </TouchableOpacity>
        </Modal>

        <Modal
          visible={this.state.visible2}
          onMaskPress={this._hideModal2}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log('第二个弹窗显示了')}
          onHide={() => console.log('第二个弹窗消失了')}
        >
          <View style={{ width: winWidth, height: winHeight, justifyContent: 'center' }}>
            <TouchableOpacity onPress={this._hideModal2} style={styles.buttonStyle}>
              <Text style={styles.textStyle}>点击我关闭这个Modal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._hideAllModal} style={styles.buttonStyle}>
              <Text style={styles.textStyle}>点击我关闭所有Modal</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          visible={this.state.dialogVisible}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log('Dialog显示了')}
          onHide={() => console.log('Dialog消失了')}
        >
          <View style={{ width: winWidth, height: winHeight, justifyContent: 'center' }}>
            <Alert title="标题" subTitle="副标题" confirmText="确认" onConfirm={this._hideDialog} />
          </View>
        </Modal>
        <Modal.Countdown
          visible={this.state.popupVisible}
          onlyLastModalVisible={this.state.onlyLastModalVisible}
          onShow={() => console.log('Popup显示了')}
          onHide={() => console.log('Popup消失了')}
          value={0}
          onMaskPress={this._hidePopup}
          onValueChange={() => {}}
          onCancel={this._hidePopup}
          onConfirm={this._hidePopup}
          title="倒计时"
          cancelText="取消"
          confirmText="确认"
          hourText="小时"
          minuteText="分钟"
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
