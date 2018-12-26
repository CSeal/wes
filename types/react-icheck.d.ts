declare module 'react-icheck' {
    interface CheckboxProps {
        labelClassName?: string;
        className?: string;
        children?: React.ReactNode;
        radioClass?: string;
        checkboxClass?: string;
        increaseArea? : string;
        label?: string;
        value?: string;
        cursor?: boolean;
        key?: string;
    }
    export class Checkbox extends React.Component<CheckboxProps, any> {

    }

    interface RadioGroupProps {
        value?: string;
        name?: string;
        className?: string;
        onChange?: (event: any, value: string) => void;
    }
    export class RadioGroup extends React.Component<RadioGroupProps, any> {}

    interface RadioProps {
        labelClassName?: string;
        children?: React.ReactNode;
        radioClass?: string;
        checkboxClass?: string;
        increaseArea? : string;
        label?: string;
        value?: string;
        cursor?: boolean;
        key?: string;
        onClick?: () => void;
    }
    export class Radio extends React.Component<RadioProps, any> {}
}
