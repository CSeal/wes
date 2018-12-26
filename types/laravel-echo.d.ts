declare module 'laravel-echo' {

    export class Echo {
        constructor(options: any);
        listen(channel: string, event: string, callback: Function): any;
        channel(channel: string): any;
        private(channel: string): any;
    }
    export default Echo;
}