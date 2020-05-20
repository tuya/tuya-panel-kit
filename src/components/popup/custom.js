import PropTypes from 'prop-types';
import withSkeleton from './withSkeleton';

function CustomPopup({ content }) {
  return content;
}

CustomPopup.displayName = 'Custom';

CustomPopup.PropTypes = {
  /**
   * 自定义内容
   */
  content: PropTypes.any.isRequired,
};

export const CustomModal = withSkeleton(CustomPopup, true);

export default withSkeleton(CustomPopup);
