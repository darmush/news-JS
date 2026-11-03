import Loader from './loader';

function requireEnvVariable(value: string | undefined, name: string): string {
    if (!value) {
        throw new Error(`Environment variable '${name}' is not set`);
    }
    return value;
}

class AppLoader extends Loader {
    constructor() {
        super(requireEnvVariable(process.env.API_URL, 'API_URL'), {
            apiKey: requireEnvVariable(process.env.API_KEY, 'API_KEY'),
        });
    }
}

export default AppLoader;
