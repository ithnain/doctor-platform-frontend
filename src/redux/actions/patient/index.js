import { REGISTER_PATIENT } from '../../types';
export function registerPatient(payload) {
    return { type: REGISTER_PATIENT, payload };
}

