
export interface EditableItem {
  id: string;
  name: string;
  commonName?: string;
  included: boolean;
}

export const commonConditions = [
  { id: "common1", name: "Asthma", included: false },
  { id: "common2", name: "Sleep Apnea", included: false },
  { id: "common3", name: "Gastric Reflux", commonName: "GERD", included: false },
  { id: "common4", name: "Depression", included: false },
  { id: "common5", name: "Anxiety", included: false },
];

export const commonMedications = [
  { id: "med1", name: "Metformin 500mg", commonName: "Glucophage", included: false },
  { id: "med2", name: "Lisinopril 10mg", commonName: "Prinivil", included: false },
  { id: "med3", name: "Atorvastatin 20mg", commonName: "Lipitor", included: false },
  { id: "med4", name: "Aspirin 81mg", included: false },
  { id: "med5", name: "Omeprazole 20mg", commonName: "Prilosec", included: false },
];
