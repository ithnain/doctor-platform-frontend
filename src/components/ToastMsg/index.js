import PropTypes from 'prop-types';
import toastr from 'toastr';

function Toast({ msg, type }) {
    switch (type) {
        case 'error':
            return <>{toastr.error(msg)}</>;

        case 'success':
            return <>{toastr.success(msg)}</>;
        default:
            break;
    }
}

Toast.propTypes = { msg: PropTypes.string.isRequired, type: PropTypes.string.isRequired };

export default Toast;
