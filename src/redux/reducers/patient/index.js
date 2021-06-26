import { REGISTER_PATIENT } from '../../types';
const initialState = { hospitalPatients: [], userPatient: [] };
export default function patientReducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER_PATIENT:
            const copyUserPatient = [...state.userPatient];
            const copyHospitalPatients = [...state.hospitalPatients];
            // check if the patient is exists
            const i = copyUserPatient.findIndex((patient) => patient.id === action.payload.id);
            if (i !== -1) {
                copyUserPatient.splice(i, 1, action.payload);
            } else {
                copyUserPatient.push(action.payload);
            }
            const j = copyHospitalPatients.findIndex((patient) => patient.id === action.payload.id);
            if (j !== -1) {
                copyUserPatient.splice(j, 1, action.payload);
            } else {
                copyHospitalPatients.push(action.payload);
            }
            return {
                ...state,
                hospitalPatients: copyHospitalPatients,
                userPatient: copyUserPatient
            };

        default:
            return state;
    }
}
