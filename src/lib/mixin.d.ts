declare const eventRegister: (router: {
    forward: () => void;
    push: (location: string, onResolve?: any, onReject?: any) => any;
    go: (n: number) => void;
    replace: (location: string, onResolve?: any, onReject?: any) => any;
    back: () => void;
}) => void;
export default eventRegister;
