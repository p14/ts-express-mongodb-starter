import { Schema, model } from 'mongoose';

export default class ModelsContainer {
    private dependencies: Record<string, any> = {};
  
    public register<T>(name: string, schema: Schema): void {
        this.dependencies[name] = model<T>(name, schema);
    }
  
    public get<T>(name: string): T {
        if (this.dependencies[name]) {
            return this.dependencies[name];
        }
        throw new Error(`Dependency not registered: ${name}`);
    }
};
