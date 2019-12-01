import PropTypes from 'prop-types';
import withSkeleton from './withSkeleton';

function CustomPopup({ content }) {
  return content;
}

CustomPopup.displayName = 'Custom';

CustomPopup.PropTypes = {
  content: PropTypes.any.isRequired,
};

export const CustomModal = withSkeleton(CustomPopup, true);

export default withSkeleton(CustomPopup);
