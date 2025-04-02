export interface AlertProps {
    type?: 'success' | 'error' | 'warning' | 'info';
    effect?: 'light' | 'dark';
    closable?: boolean;
}

export interface AlertEmits {
    (e:'close') : void;
}

export type AlertType = 'success' | 'warning' | 'danger' | 'info';
export type AlertEffect = 'light' | 'dark';