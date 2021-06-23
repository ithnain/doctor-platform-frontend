//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
import useTranslation from 'next-translate/useTranslation';


function Doctor() {
    const { t } = useTranslation('doctor');
    return (
        <SliderLayout
            title={'Doctor'}
            keywords={'doctor,platform,any word'}
            textBtn={`${t('registerPatient')} + `}
            description={'this is the doctor page'}>
            Doctor
        </SliderLayout>
       
    );
}

Doctor.propTypes = {};

export default Doctor;
