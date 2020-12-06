import { interpolateBlues, interpolateGreens, interpolateGreys, interpolateOranges, interpolatePurples, interpolateReds, interpolateBuGn, interpolateBuPu, interpolateGnBu, interpolateOrRd, interpolatePuBuGn, interpolatePuBu, interpolatePuRd, interpolateRdPu, interpolateYlGnBu, interpolateYlGn, interpolateYlOrBr, interpolateYlOrRd, interpolateTurbo, interpolateViridis, interpolateInferno, interpolateMagma, interpolatePlasma, interpolateCividis, interpolateWarm, interpolateCool, interpolateCubehelixDefault } from 'd3-scale-chromatic';
export declare const sequentialColorSchemes: {
    blues: readonly (readonly string[])[];
    greens: readonly (readonly string[])[];
    greys: readonly (readonly string[])[];
    oranges: readonly (readonly string[])[];
    purples: readonly (readonly string[])[];
    reds: readonly (readonly string[])[];
    blue_green: readonly (readonly string[])[];
    blue_purple: readonly (readonly string[])[];
    green_blue: readonly (readonly string[])[];
    orange_red: readonly (readonly string[])[];
    purple_blue_green: readonly (readonly string[])[];
    purple_blue: readonly (readonly string[])[];
    purple_red: readonly (readonly string[])[];
    red_purple: readonly (readonly string[])[];
    yellow_green_blue: readonly (readonly string[])[];
    yellow_green: readonly (readonly string[])[];
    yellow_orange_brown: readonly (readonly string[])[];
    yellow_orange_red: readonly (readonly string[])[];
};
export declare type SequentialColorSchemeId = keyof typeof sequentialColorSchemes;
export declare const sequentialColorSchemeIds: ("blues" | "greens" | "greys" | "oranges" | "purples" | "reds" | "blue_green" | "blue_purple" | "green_blue" | "orange_red" | "purple_blue_green" | "purple_blue" | "purple_red" | "red_purple" | "yellow_green_blue" | "yellow_green" | "yellow_orange_brown" | "yellow_orange_red")[];
export declare const sequentialColorInterpolators: {
    blues: typeof interpolateBlues;
    greens: typeof interpolateGreens;
    greys: typeof interpolateGreys;
    oranges: typeof interpolateOranges;
    purples: typeof interpolatePurples;
    reds: typeof interpolateReds;
    turbo: typeof interpolateTurbo;
    viridis: typeof interpolateViridis;
    inferno: typeof interpolateInferno;
    magma: typeof interpolateMagma;
    plasma: typeof interpolatePlasma;
    cividis: typeof interpolateCividis;
    warm: typeof interpolateWarm;
    cool: typeof interpolateCool;
    cubehelixDefault: typeof interpolateCubehelixDefault;
    blue_green: typeof interpolateBuGn;
    blue_purple: typeof interpolateBuPu;
    green_blue: typeof interpolateGnBu;
    orange_red: typeof interpolateOrRd;
    purple_blue_green: typeof interpolatePuBuGn;
    purple_blue: typeof interpolatePuBu;
    purple_red: typeof interpolatePuRd;
    red_purple: typeof interpolateRdPu;
    yellow_green_blue: typeof interpolateYlGnBu;
    yellow_green: typeof interpolateYlGn;
    yellow_orange_brown: typeof interpolateYlOrBr;
    yellow_orange_red: typeof interpolateYlOrRd;
};
export declare type SequentialColorInterpolatorId = keyof typeof sequentialColorInterpolators;
//# sourceMappingURL=sequential.d.ts.map