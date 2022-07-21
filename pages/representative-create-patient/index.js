import EducatorForm from 'src/components/EducatorForm';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';

function createPatient({ direction }) {
    const { t } = useTranslation('create-patient');

    return (
        <SliderLayout
            title={t('Register Patient')}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor create patient page'}>
            <EducatorForm direction={direction} />
        </SliderLayout>
    );
}

createPatient.propTypes = {
    direction: PropTypes.string.isRequired
};

export default authenticatedRoute(createPatient);
