// We define our own jasmine types, because if we use the @types/jasmine the global methods conflict with the mocha ones.
declare module "jasmine" {
    declare namespace jasmine {
        interface Configuration {
            spec_files: string[];
            random: boolean;
            seed: string | null;
        }
    }

    class jasmine {
        jasmine: {
            DEFAULT_TIMEOUT_INTERVAL: number;
        };
        constructor();
        loadConfig(config: Configuration): void;
        exitOnCompletion: boolean;
        execute(): Promise<{
            overallStatus: "failed" | "success";
            totalTime: number;
        }>;
        clearReporters(): void;
        addReporter(reporter: unknown): void;
        coreVersion(): string;
    }

    export = jasmine;
}