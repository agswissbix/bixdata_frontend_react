export const consoleDebug = (text: String,value?: any): void => {
    if (typeof value === 'object' && value !== null) {
        console.info(text+': Var dump (expanded):', JSON.stringify(value, null, 2));
    } else {
        console.info(text+': ', value);
    }
};
