export default class ContadorSingleton {
    private static instance: ContadorSingleton;
    private contador: number;

    private constructor() {
        this.contador = 0;
    }

    public static getInstance(): ContadorSingleton {
        if (!ContadorSingleton.instance) {
            ContadorSingleton.instance = new ContadorSingleton();
        }

        return ContadorSingleton.instance;
    }

    public getContador(): number {
        this.contador++;
        return this.contador;
    }

}