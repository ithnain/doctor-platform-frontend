import { REGISTER_PATIENT } from '../../types';
const initialState = { hospitalPatients: [], userPatient: [] };
export default function patientReducer(state = initialState, action) {
    //needs refactor
    const copyUserPatient = [...state.userPatient];
    const copyHospitalPatients = [...state.hospitalPatients];
    const i = copyUserPatient.findIndex((patient) => patient.id === action.payload.id);
    const j = copyHospitalPatients.findIndex((patient) => patient.id === action.payload.id);
    switch (action.type) {
        case REGISTER_PATIENT:
            // check if the patient is exists
            if (i !== -1) {
                copyUserPatient.splice(i, 1, action.payload);
            } else {
                copyUserPatient.push(action.payload);
            }
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
