declare module 'react-bootstrap-timezone-picker' {
    interface TimezonePickerProps {
        absolute?: boolean;
        className?: string;
        defaultValue?: string;
        placeholder?: string;
        onChange?: (newValue: string) => any;
        onBlur?: (newValue: string) => any;
        style?: {};
        timezones?: {};
        value?: string;
        children?: React.ReactNode;
    }
    export class TimezonePicker extends React.Component<TimezonePickerProps, any> {
    }
    export default TimezonePicker;
}