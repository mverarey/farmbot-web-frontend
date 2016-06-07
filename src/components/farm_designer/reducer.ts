import { Plant } from "./interfaces";
import { Plant as newPlant } from "./plant";
import { generateReducer } from "../generate_reducer";
import { DesignerState } from "./interfaces";
import { cloneDeep } from "lodash";

let probe = (s, a) => {
    console.log(`➫ ${ a.type }`)
    return s;
};

export let designer = generateReducer<DesignerState>({plants: []}, probe)
  .add<Plant[]>(function FETCH_PLANTS_OK(s, a) {
    let state = cloneDeep(s);
    state.plants = a.payload;
    return state;
  })
  .add<Plant>(function SAVE_PLANT_OK(s, a) {
    let state = cloneDeep(s);
    // Exxxttrraaa runtime safety.
    let plant = newPlant(a.payload);
    state.plants.push(plant);
    return state;
  });