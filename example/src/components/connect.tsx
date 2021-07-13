import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

type ChildrenType = (props: any) => React.ReactElement | null;

const ComponentRenderChildren = ({ children, ...props }: { children: ChildrenType }) =>
  children(props);

export const Connect = connect(
  (state: any, { mapStateToProps }: { mapStateToProps: any }) => mapStateToProps(state),
  (dispatch: any, { mapDispatchToProps }: { mapDispatchToProps: any }) => {
    if (typeof mapDispatchToProps === 'object') {
      return bindActionCreators(mapDispatchToProps, dispatch);
    }
    if (typeof mapDispatchToProps === 'function') {
      return mapDispatchToProps(dispatch);
    }
    return {};
  }
)(ComponentRenderChildren);
