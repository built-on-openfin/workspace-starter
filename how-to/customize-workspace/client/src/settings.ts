import { fin } from 'openfin-adapter/src/mock';
import { CustomSettings } from './shapes';
import { CustomThemes } from '@openfin/workspace-platform';

let settings:CustomSettings;

async function getConfiguredSettings(): Promise<CustomSettings> {
    const app = await fin.Application.getCurrent();
    const manifest = await app.getManifest();
  
    if (manifest.customSettings !== undefined) {
      settings = manifest.customSettings;
    } else {
        settings = {};
    }
  
    return settings;
}

export async function getSettings(): Promise<CustomSettings> {
    if(settings === undefined) {
        settings = await getConfiguredSettings();
    }
    return settings;
}

function getSystemPreferredColorScheme() {
    if (window.matchMedia) {
      if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        return 'dark';
      } else {
        return 'light';
      }
    }
    return 'light';
  }

function validatePalette(themePalette, themeLabel:string): any {
    let palette = {};

    let keys = Object.keys(themePalette);

    keys.forEach(key => {
        if(themePalette[key] !== undefined && themePalette[key] !== null && themePalette[key].trim().length > 0) {
            palette[key] = themePalette[key];
        }
    });

    const brandPrimaryKey = "brandPrimary";
    const brandPrimaryValue = "#504CFF";
    const brandSecondaryKey = "brandSecondary";
    const brandSecondaryValue = "#383A40";
    const backgroundPrimaryKey = "backgroundPrimary";
    const backgroundPrimaryValue = "#111214";

    if(palette[brandPrimaryKey] === undefined) {
        console.warn(`Theme: ${themeLabel} : ${brandPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${brandPrimaryValue}`);
        palette[brandPrimaryKey] =  brandPrimaryValue;
    }

    if(palette[brandSecondaryKey] === undefined) {
        console.warn(`Theme: ${themeLabel} : ${brandSecondaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${brandSecondaryValue}`);
        palette[brandSecondaryKey] =  brandSecondaryValue;
    }

    if(palette[backgroundPrimaryKey] === undefined) {
        console.warn(`Theme: ${themeLabel} : ${backgroundPrimaryKey} not specified (it is required if specifying other theme palette settings). Providing default of: ${backgroundPrimaryValue}`);
        palette[backgroundPrimaryKey] =  backgroundPrimaryValue;
    }

    return palette;
}

export function validateThemes(themes: CustomThemes) : CustomThemes {

    let validatedThemes = [];
    let defaultTheme;
    let preferredColorScheme = getSystemPreferredColorScheme();

    if(Array.isArray(themes)) {
        for(let i = 0; i < themes.length; i++) {
            let themeToValidate = themes[i];
            let palette = validatePalette(themeToValidate.palette, themeToValidate.label);
            if(palette !== null) {
                themeToValidate.palette = palette;
            } else {
                // don't pass an empty object as there are no theme properties
                themeToValidate.palette = undefined;
            }
            if(themeToValidate.label.toLowerCase() === preferredColorScheme) {
                // do not add it to the array. Hold it back to push to the front of the list of themes for default selection
                defaultTheme = themeToValidate;
            } else {
                validatedThemes.push(themeToValidate);
            }
        }
    }

    if(defaultTheme !== undefined) {
        console.log("Found a theme that matches system color scheme preferences and making it the default theme: " + preferredColorScheme);
        validatedThemes.unshift(defaultTheme);
    }

    return validatedThemes;
}