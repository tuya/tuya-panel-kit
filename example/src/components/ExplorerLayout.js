import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import { connect } from 'react-redux';

const ExplorerLayout = ({
  style,
  scrollEnabled,
  contentStyle,
  renderContent,
  renderPlayground,
}) => {
  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      contentContainerStyle={[styles.container, style]}
    >
      <View style={[styles.content, contentStyle]}>
        {renderContent()}
      </View>
      <View style={{ alignSelf: 'stretch', paddingHorizontal: 12 }}>
        {typeof renderPlayground === 'function' ? renderPlayground() : <View />}
      </View>
    </ScrollView>
  );
};

ExplorerLayout.propTypes = {
  style: ViewPropTypes.style,
  scrollEnabled: PropTypes.bool,
  contentStyle: ViewPropTypes.style,
  renderContent: PropTypes.func.isRequired,
  renderPlayground: PropTypes.func,
};

ExplorerLayout.defaultProps = {
  style: null,
  scrollEnabled: true,
  contentStyle: null,
  renderPlayground: null,
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(({ uiState }, ownProps) => ({
  scrollEnabled: typeof ownProps.scrollEnabled !== 'undefined'
    ? ownProps.scrollEnabled
    : !uiState.gesturing, // 组件内部手势操作时，不可滚动
}), null, null, { pure: false })(ExplorerLayout);
