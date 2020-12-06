import { DivergingColorInterpolatorId } from './diverging';
import { SequentialColorInterpolatorId } from './sequential';
import { CyclicalColorInterpolatorId } from './cyclical';
export declare const colorInterpolators: {
    rainbow: typeof import("d3-scale-chromatic").interpolateRainbow;
    sinebow: typeof import("d3-scale-chromatic").interpolateSinebow;
    blues: typeof import("d3-scale-chromatic").interpolateBlues;
    greens: typeof import("d3-scale-chromatic").interpolateGreens;
    greys: typeof import("d3-scale-chromatic").interpolateGreys;
    oranges: typeof import("d3-scale-chromatic").interpolateOranges;
    purples: typeof import("d3-scale-chromatic").interpolatePurples;
    reds: typeof import("d3-scale-chromatic").interpolateReds;
    turbo: typeof import("d3-scale-chromatic").interpolateTurbo;
    viridis: typeof import("d3-scale-chromatic").interpolateViridis;
    inferno: typeof import("d3-scale-chromatic").interpolateInferno;
    magma: typeof import("d3-scale-chromatic").interpolateMagma;
    plasma: typeof import("d3-scale-chromatic").interpolatePlasma;
    cividis: typeof import("d3-scale-chromatic").interpolateCividis;
    warm: typeof import("d3-scale-chromatic").interpolateWarm;
    cool: typeof import("d3-scale-chromatic").interpolateCool;
    cubehelixDefault: typeof import("d3-scale-chromatic").interpolateCubehelixDefault;
    blue_green: typeof import("d3-scale-chromatic").interpolateBuGn;
    blue_purple: typeof import("d3-scale-chromatic").interpolateBuPu;
    green_blue: typeof import("d3-scale-chromatic").interpolateGnBu;
    orange_red: typeof import("d3-scale-chromatic").interpolateOrRd;
    purple_blue_green: typeof import("d3-scale-chromatic").interpolatePuBuGn;
    purple_blue: typeof import("d3-scale-chromatic").interpolatePuBu;
    purple_red: typeof import("d3-scale-chromatic").interpolatePuRd;
    red_purple: typeof import("d3-scale-chromatic").interpolateRdPu;
    yellow_green_blue: typeof import("d3-scale-chromatic").interpolateYlGnBu;
    yellow_green: typeof import("d3-scale-chromatic").interpolateYlGn;
    yellow_orange_brown: typeof import("d3-scale-chromatic").interpolateYlOrBr;
    yellow_orange_red: typeof import("d3-scale-chromatic").interpolateYlOrRd;
    brown_blueGreen: typeof import("d3-scale-chromatic").interpolateBrBG;
    purpleRed_green: typeof import("d3-scale-chromatic").interpolatePRGn;
    pink_yellowGreen: typeof import("d3-scale-chromatic").interpolatePiYG;
    purple_orange: typeof import("d3-scale-chromatic").interpolatePuOr;
    red_blue: typeof import("d3-scale-chromatic").interpolateRdBu;
    red_grey: typeof import("d3-scale-chromatic").interpolateRdGy;
    red_yellow_blue: typeof import("d3-scale-chromatic").interpolateRdYlBu;
    red_yellow_green: typeof import("d3-scale-chromatic").interpolateRdYlGn;
    spectral: typeof import("d3-scale-chromatic").interpolateSpectral;
};
export declare type ColorInterpolatorId = DivergingColorInterpolatorId | SequentialColorInterpolatorId | CyclicalColorInterpolatorId;
export declare const colorInterpolatorIds: ColorInterpolatorId[];
//# sourceMappingURL=interpolators.d.ts.map