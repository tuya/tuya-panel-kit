import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import { CircularPicker } from 'tuya-panel-kit';
import ExplorerLayout from '../../components/ExplorerLayout';
import ControlBoolean from '../../components/ControlBoolean';
import ControlNumber from '../../components/ControlNumber';
import { store } from '../../main';
import { startGesture, stopGesture } from '../../redux/modules/uiState';

const Res = {
  hue: require('../../res/hue.png'),
};

export default class CircularPickerPlaygroundScene extends Component {
  state = {
    disabled: false,
    showProgress: false,
    showHue: false,
    degree: 30,
    radius: 115,
    strokeWidth: 40,
    startDegree: 30,
    endDegree: 330,
  }

  get _radius() {
    return this.state.showHue ? 115 : this.state.radius;
  }

  get _strokeWidth() {
    return this.state.showHue ? 40 : this.state.strokeWidth;
  }

  get _startDegree() {
    return this.state.showHue ? 0 : this.state.startDegree;
  }

  get _endDegree() {
    return this.state.showHue ? 360 : this.state.endDegree;
  }

  _handleBoolChange = key => value => {
    this.setState({ [key]: value });
  }

  _handleNumberChange = key => value => {
    this.setState({ [key]: Math.round(value) });
  }

  _handleStart = () => {
    store.dispatch(startGesture());
  }

  _handleColorChange = data => {
    this.setState({ degree: Math.round(data.degree) });
  }

  _handleComplete = data => {
    store.dispatch(stopGesture());
    this.setState({ degree: Math.round(data.degree) });
  }

  renderContent = () => {
    return (
      <CircularPicker
        degree={this.state.degree}
        radius={this._radius}
        frontStrokeColor={this.state.showProgress ? 'blue' : null}
        strokeColor="red"
        strokeWidth={this._strokeWidth}
        startDegree={this._startDegree}
        endDegree={this._endDegree}
        disabled={this.state.disabled}
        TrackComponent={this.state.showHue ? <Image source={Res.hue} /> : null}
        onStart={this._handleStart}
        onValueChange={this._handleColorChange}
        onComplete={this._handleComplete}
      />
    );
  }

  renderPlayground = () => {
    return (
      <View>
        <ControlBoolean
          title="Toggle Disabled"
          value={this.state.disabled}
          onValueChange={this._handleBoolChange('disabled')}
        />
        <ControlBoolean
          title="Toggle Progress"
          value={this.state.showProgress}
          onValueChange={this._handleBoolChange('showProgress')}
        />
        <ControlBoolean
          title="Toggle Hue Picker"
          value={this.state.showHue}
          onValueChange={this._handleBoolChange('showHue')}
        />
        <ControlNumber
          min={0}
          max={130}
          value={this._radius}
          title="radius"
          onChange={this._handleNumberChange('radius')}
          onComplete={this._handleNumberChange('radius')}
        />
        <ControlNumber
          min={0}
          max={80}
          value={this._strokeWidth}
          title="strokeWidth"
          onChange={this._handleNumberChange('strokeWidth')}
          onComplete={this._handleNumberChange('strokeWidth')}
        />
        <ControlNumber
          min={0}
          max={360}
          title="degree"
          value={this.state.degree}
          onChange={this._handleNumberChange('degree')}
          onComplete={this._handleNumberChange('degree')}
        />
        <ControlNumber
          min={0}
          max={180}
          value={this._startDegree}
          title="startDegree"
          onChange={this._handleNumberChange('startDegree')}
          onComplete={this._handleNumberChange('startDegree')}
        />
        <ControlNumber
          min={180}
          max={360}
          title="endDegree"
          value={this._endDegree}
          onChange={this._handleNumberChange('endDegree')}
          onComplete={this._handleNumberChange('endDegree')}
        />
      </View>
    );
  }

  render() {
    return (
      <ExplorerLayout
        contentStyle={{
          height: 400,
          justifyContent: 'center',
        }}
        renderContent={this.renderContent}
        renderPlayground={this.renderPlayground}
      />
    );
  }
}
