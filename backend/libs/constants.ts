export enum device_type {
    'cough_sensor', 'bed_sensor', 'door_sensor', 'chair_sensor', 'toilet_flush_sensor', 'fridge_sensor', 'proximitiy_sensor'
};

export enum patient_status_change {
    'admit', 'discharge', 'transfer'
};

export enum reviewer_result {
    'no_action', 'escalate', 'other'
}