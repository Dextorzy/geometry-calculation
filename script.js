const lengthUnits = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

const volumeUnits = {
  mm3: 1e-9,
  cm3: 1e-6,
  m3: 1,
  in3: 1.6387064e-5,
  ft3: 0.0283168466,
  yd3: 0.764554858,
  liter: 0.001,
  dm3: 0.001,
};

const formulaMeta = {
  circle: {
    area: { label: 'ផ្ទៃក្រឡា Area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'radius', label: 'កាំ Radius' }] , compute: ({ radius }) => Math.PI * radius * radius },
    circumference: { label: 'រង្វង់ Circumference', inputKind: 'length', outputKind: 'length', fields: [{ name: 'radius', label: 'កាំ Radius' }], compute: ({ radius }) => 2 * Math.PI * radius },
    diameter: { label: 'អង្កត់ផ្ចិត Diameter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'radius', label: 'កាំ Radius' }], compute: ({ radius }) => 2 * radius },
    radiusFromArea: { label: 'កាំ Radius from area', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'ផ្ទៃក្រឡា Area' }], compute: ({ area }) => Math.sqrt(area / Math.PI) },
    radiusFromCircumference: { label: 'កាំ Radius from circumference', inputKind: 'length', outputKind: 'length', fields: [{ name: 'circumference', label: 'រង្វង់ Circumference' }], compute: ({ circumference }) => circumference / (2 * Math.PI) },
    radiusFromDiameter: { label: 'កាំ Radius from diameter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'diameter', label: 'អង្កត់ផ្ចិត Diameter' }], compute: ({ diameter }) => diameter / 2 },
  },
  triangle: {
    areaBaseHeight: { label: 'Area from base and height', inputKind: 'length', outputKind: 'area', fields: [{ name: 'base', label: 'Base' }, { name: 'height', label: 'Height' }], compute: ({ base, height }) => 0.5 * base * height },
    perimeter: { label: 'Perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'a', label: 'Side 1' }, { name: 'b', label: 'Side 2' }, { name: 'c', label: 'Side 3' }], compute: ({ a, b, c }) => a + b + c },
    heightFromAreaBase: { label: 'Height from area and base', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'base', label: 'Base' }], compute: ({ area, base }) => (2 * area) / base },
    baseFromAreaHeight: { label: 'Base from area and height', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'height', label: 'Height' }], compute: ({ area, height }) => (2 * area) / height },
    heronArea: { label: 'Area from 3 sides', inputKind: 'length', outputKind: 'area', fields: [{ name: 'a', label: 'Side 1' }, { name: 'b', label: 'Side 2' }, { name: 'c', label: 'Side 3' }], compute: ({ a, b, c }) => { const s = (a + b + c) / 2; return Math.sqrt(s * (s - a) * (s - b) * (s - c)); } },
  },
  rectangle: {
    area: { label: 'Area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'length', label: 'Length' }, { name: 'width', label: 'Width' }], compute: ({ length, width }) => length * width },
    perimeter: { label: 'Perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'length', label: 'Length' }, { name: 'width', label: 'Width' }], compute: ({ length, width }) => 2 * (length + width) },
    length: { label: 'Length', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'width', label: 'Width' }], compute: ({ area, width }) => area / width },
    width: { label: 'Width', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'length', label: 'Length' }], compute: ({ area, length }) => area / length },
    diagonal: { label: 'Diagonal', inputKind: 'length', outputKind: 'length', fields: [{ name: 'length', label: 'Length' }, { name: 'width', label: 'Width' }], compute: ({ length, width }) => Math.sqrt(length * length + width * width) },
  },
  square: {
    area: { label: 'Area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'side', label: 'Side' }], compute: ({ side }) => side * side },
    perimeter: { label: 'Perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'side', label: 'Side' }], compute: ({ side }) => 4 * side },
    sideLength: { label: 'Side length', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }], compute: ({ area }) => Math.sqrt(area) },
    diagonal: { label: 'Diagonal', inputKind: 'length', outputKind: 'length', fields: [{ name: 'side', label: 'Side' }], compute: ({ side }) => side * Math.sqrt(2) },
  },
  parallelogram: {
    area: { label: 'Area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'base', label: 'Base' }, { name: 'height', label: 'Height' }], compute: ({ base, height }) => base * height },
    perimeter: { label: 'Perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'side1', label: 'Side 1' }, { name: 'side2', label: 'Side 2' }], compute: ({ side1, side2 }) => 2 * (side1 + side2) },
    height: { label: 'Height', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'base', label: 'Base' }], compute: ({ area, base }) => area / base },
    base: { label: 'Base', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'height', label: 'Height' }], compute: ({ area, height }) => area / height },
  },
  cone: {
    volume: { label: 'Volume', inputKind: 'length', outputKind: 'volume', fields: [{ name: 'radius', label: 'Radius' }, { name: 'height', label: 'Height' }], compute: ({ radius, height }) => (1 / 3) * Math.PI * radius * radius * height },
    surfaceArea: { label: 'Surface area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'radius', label: 'Radius' }, { name: 'slant', label: 'Slant height' }], compute: ({ radius, slant }) => Math.PI * radius * (radius + slant) },
    lateralArea: { label: 'Lateral area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'radius', label: 'Radius' }, { name: 'slant', label: 'Slant height' }], compute: ({ radius, slant }) => Math.PI * radius * slant },
    slantHeight: { label: 'Slant height', inputKind: 'length', outputKind: 'length', fields: [{ name: 'radius', label: 'Radius' }, { name: 'height', label: 'Height' }], compute: ({ radius, height }) => Math.sqrt(radius * radius + height * height) },
    radiusFromVolumeHeight: { label: 'Radius from volume and height', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'height', label: 'Height' }], compute: ({ volume, height }) => Math.sqrt((3 * volume) / (Math.PI * height)) },
    heightFromVolumeRadius: { label: 'Height from volume and radius', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'radius', label: 'Radius' }], compute: ({ volume, radius }) => (3 * volume) / (Math.PI * radius * radius) },
  },
  cylinder: {
    volume: { label: 'Volume', inputKind: 'length', outputKind: 'volume', fields: [{ name: 'radius', label: 'Radius' }, { name: 'height', label: 'Height' }], compute: ({ radius, height }) => Math.PI * radius * radius * height },
    surfaceArea: { label: 'Surface area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'radius', label: 'Radius' }, { name: 'height', label: 'Height' }], compute: ({ radius, height }) => 2 * Math.PI * radius * (radius + height) },
    lateralArea: { label: 'Lateral area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'radius', label: 'Radius' }, { name: 'height', label: 'Height' }], compute: ({ radius, height }) => 2 * Math.PI * radius * height },
    heightFromVolumeRadius: { label: 'Height from volume and radius', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'radius', label: 'Radius' }], compute: ({ volume, radius }) => volume / (Math.PI * radius * radius) },
    radiusFromVolumeHeight: { label: 'Radius from volume and height', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'height', label: 'Height' }], compute: ({ volume, height }) => Math.sqrt(volume / (Math.PI * height)) },
  },
  trapezoid: {
    area: { label: 'Area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'top', label: 'Top base' }, { name: 'bottom', label: 'Bottom base' }, { name: 'height', label: 'Height' }], compute: ({ top, bottom, height }) => 0.5 * (top + bottom) * height },
    perimeter: { label: 'Perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'top', label: 'Top base' }, { name: 'bottom', label: 'Bottom base' }, { name: 'side1', label: 'Side 1' }, { name: 'side2', label: 'Side 2' }], compute: ({ top, bottom, side1, side2 }) => top + bottom + side1 + side2 },
    height: { label: 'Height', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'top', label: 'Top base' }, { name: 'bottom', label: 'Bottom base' }], compute: ({ area, top, bottom }) => (2 * area) / (top + bottom) },
    topBase: { label: 'Top base', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'bottom', label: 'Bottom base' }, { name: 'height', label: 'Height' }], compute: ({ area, bottom, height }) => ((2 * area) / height) - bottom },
    bottomBase: { label: 'Bottom base', inputKind: 'area', outputKind: 'length', fields: [{ name: 'area', label: 'Area' }, { name: 'top', label: 'Top base' }, { name: 'height', label: 'Height' }], compute: ({ area, top, height }) => ((2 * area) / height) - top },
  },
  pyramid: {
    volume: { label: 'Volume', inputKind: 'length', outputKind: 'volume', fields: [{ name: 'baseArea', label: 'Base area' }, { name: 'height', label: 'Height' }], compute: ({ baseArea, height }) => (1 / 3) * baseArea * height },
    baseArea: { label: 'Base area', inputKind: 'volume', outputKind: 'area', fields: [{ name: 'volume', label: 'Volume' }, { name: 'height', label: 'Height' }], compute: ({ volume, height }) => (3 * volume) / height },
    height: { label: 'Height', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'baseArea', label: 'Base area' }], compute: ({ volume, baseArea }) => (3 * volume) / baseArea },
    lateralArea: { label: 'Lateral area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'perimeter', label: 'Base perimeter' }, { name: 'slantHeight', label: 'Slant height' }], compute: ({ perimeter, slantHeight }) => 0.5 * perimeter * slantHeight },
    totalSurfaceArea: { label: 'Total surface area', inputKind: 'area', outputKind: 'area', fields: [{ name: 'baseArea', label: 'Base area' }, { name: 'lateralArea', label: 'Lateral area' }], compute: ({ baseArea, lateralArea }) => baseArea + lateralArea },
  },
  'triangular-pyramid': {
    volume: { label: 'Volume', inputKind: 'length', outputKind: 'volume', fields: [{ name: 'baseArea', label: 'Base area' }, { name: 'height', label: 'Height' }], compute: ({ baseArea, height }) => (1 / 3) * baseArea * height },
    baseArea: { label: 'Base area', inputKind: 'volume', outputKind: 'area', fields: [{ name: 'volume', label: 'Volume' }, { name: 'height', label: 'Height' }], compute: ({ volume, height }) => (3 * volume) / height },
    height: { label: 'Height', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }, { name: 'baseArea', label: 'Base area' }], compute: ({ volume, baseArea }) => (3 * volume) / baseArea },
    basePerimeter: { label: 'Base perimeter', inputKind: 'length', outputKind: 'length', fields: [{ name: 'side1', label: 'Side 1' }, { name: 'side2', label: 'Side 2' }, { name: 'side3', label: 'Side 3' }], compute: ({ side1, side2, side3 }) => side1 + side2 + side3 },
  },
  cube: {
    volume: { label: 'Volume', inputKind: 'length', outputKind: 'volume', fields: [{ name: 'side', label: 'Side length' }], compute: ({ side }) => side * side * side },
    surfaceArea: { label: 'Surface area', inputKind: 'length', outputKind: 'area', fields: [{ name: 'side', label: 'Side length' }], compute: ({ side }) => 6 * side * side },
    sideLength: { label: 'Side length', inputKind: 'volume', outputKind: 'length', fields: [{ name: 'volume', label: 'Volume' }], compute: ({ volume }) => Math.cbrt(volume) },
    spaceDiagonal: { label: 'Space diagonal', inputKind: 'length', outputKind: 'length', fields: [{ name: 'side', label: 'Side length' }], compute: ({ side }) => side * Math.sqrt(3) },
  },
};

const khmerLabels = {
  circle: 'រង្វង់',
  triangle: 'ត្រីកោណ',
  rectangle: 'ចតុកោណ',
  square: 'ការ៉េ',
  parallelogram: 'ប្រលេឡូក្រាម',
  cone: 'កោន',
  cylinder: 'ស៊ីលីនដ័រ',
  trapezoid: 'ចតុកោណព្នាយ',
  pyramid: 'ពីរ៉ាមីតចតុមុខ',
  'triangular-pyramid': 'ពីរ៉ាមីតត្រីមុខ',
  cube: 'គូប',
};

const khmerFormulas = {
  area: 'ផ្ទៃក្រឡា',
  volume: 'បរិមាណ',
  circumference: 'រង្វង់',
  perimeter: 'បរិវេណ',
  diameter: 'អង្កត់ផ្ចិត',
  surfaceArea: 'ផ្ទៃលេខ័ន្ទ',
  lateralArea: 'ផ្ទៃក្រោយ',
  slantHeight: 'កម្ពស់ដេក',
  height: 'កម្ពស់',
  radius: 'កាំ',
  side: 'ជ្រុង',
  base: 'មូលដ្ឋាន',
  diagonal: 'អង្កត់ទ្រូង',
};

const shapeSelect = document.getElementById('shape');
const formulaSelect = document.getElementById('formula');
const inputUnitSelect = document.getElementById('input-unit');
const outputUnitSelect = document.getElementById('output-unit');
const inputFields = document.getElementById('input-fields');
const resultBox = document.getElementById('result');
const form = document.getElementById('calculator-form');

function getUnitOptions(kind) {
  return kind === 'volume' ? Object.keys(volumeUnits) : Object.keys(lengthUnits);
}

function populateFormulaOptions() {
  const shape = shapeSelect.value;
  const formulas = formulaMeta[shape];
  formulaSelect.innerHTML = '';

  Object.entries(formulas).forEach(([key, entry]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = entry.label;
    formulaSelect.appendChild(option);
  });

  renderInputs();
}

function renderInputs() {
  const shape = shapeSelect.value;
  const formula = formulaSelect.value;
  const meta = formulaMeta[shape][formula];
  const outputOptions = getUnitOptions(meta.outputKind);

  outputUnitSelect.innerHTML = '';

  outputOptions.forEach((unit) => {
    const option = document.createElement('option');
    option.value = unit;
    option.textContent = unit;
    outputUnitSelect.appendChild(option);
  });

  inputFields.innerHTML = '';
  meta.fields.forEach((field) => {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'field-with-unit';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.name = field.name;
    input.placeholder = field.label;
    input.className = 'value-input';
    
    const unitLabel = document.createElement('label');
    unitLabel.className = 'unit-label';
    unitLabel.textContent = 'ឯកតា Unit';
    
    const unitSelect = document.createElement('select');
    unitSelect.name = `${field.name}-unit`;
    unitSelect.className = 'field-unit';
    
    const unitOptions = getUnitOptions(field.inputKind || meta.inputKind);
    unitOptions.forEach((unit) => {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      unitSelect.appendChild(option);
    });
    
    label.appendChild(input);
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(unitLabel);
    fieldContainer.appendChild(unitSelect);
    inputFields.appendChild(fieldContainer);
  });
}

function convertLength(value, fromUnit, toUnit) {
  return value * (lengthUnits[fromUnit] / lengthUnits[toUnit]);
}

function convertArea(value, fromUnit, toUnit) {
  return value * ((lengthUnits[fromUnit] / lengthUnits[toUnit]) ** 2);
}

function convertVolume(value, fromUnit, toUnit) {
  return value * (volumeUnits[fromUnit] / volumeUnits[toUnit]);
}

function formatResult(value, unit, kind) {
  if (kind === 'area') {
    return `${value.toFixed(2)} ${unit}²`;
  }
  if (kind === 'volume') {
    if (unit === 'liter' || unit === 'dm3') {
      return `${value.toFixed(2)} លីត្រ (liters)`;
    }
    return `${value.toFixed(2)} ${unit}³`;
  }
  return `${value.toFixed(2)} ${unit}`;
}

function buildSteps(shape, formula, meta, values, fieldUnits, outputUnit, rawResult, result) {
  let steps = '';
  
  const shapeKh = khmerLabels[shape] || shape;
  const formulaKh = khmerFormulas[formula] || formula;
  
  // Title: គណនា[រូបរាង] [រូបមន្ត]
  steps += `<div class="step"><strong>គណនា${shapeKh} ${formulaKh}</strong></div>`;
  
  // Formula: តាមរូបមន្ត
  steps += `<div class="step"><strong>តាមរូបមន្ត</strong> ${meta.label}</div>`;
  
  // Given values: ដោយ field = value [unit], field2 = value2 [unit]
  let givenText = 'ដោយ ';
  meta.fields.forEach((field, index) => {
    const englishFieldName = field.label.split(' ').slice(-1)[0] || field.label;
    const khmerFieldName = khmerFormulas[field.name] || englishFieldName;
    const fieldUnit = fieldUnits[field.name];
    if (index > 0) givenText += ', ';
    givenText += `${khmerFieldName} = ${values[field.name].toFixed(2)} ${fieldUnit}`;
  });
  steps += `<div class="step"><strong>${givenText}</strong></div>`;
  
  // Show unit conversions if any field used different unit
  let hasConversions = false;
  let conversionText = 'ការប្រែលេខ៖ ';
  meta.fields.forEach((field, index) => {
    const fieldUnit = fieldUnits[field.name];
    if (fieldUnit !== outputUnit) {
      hasConversions = true;
      if (index > 0) conversionText += ', ';
      conversionText += `${field.name} من ${fieldUnit} إلى ${outputUnit}`;
    }
  });
  if (hasConversions) {
    steps += `<div class="step"><strong>${conversionText}</strong></div>`;
  }
  
  // Calculation step: យើងបាន [formula with values]
  let calculationText = 'យើងបាន';
  if (formula === 'area' && shape === 'circle') {
    calculationText = `យើងបាន S = π × ${values.radius.toFixed(2)}² = ${rawResult.toFixed(2)}`;
  } else if (formula === 'circumference' && shape === 'circle') {
    calculationText = `យើងបាន C = 2π × ${values.radius.toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else if (formula === 'area' && (shape === 'rectangle' || shape === 'parallelogram')) {
    calculationText = `យើងបាន S = ${values[meta.fields[0].name].toFixed(2)} × ${values[meta.fields[1].name].toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else if (formula === 'perimeter' && shape === 'rectangle') {
    calculationText = `យើងបាន P = 2 × (${values.length.toFixed(2)} + ${values.width.toFixed(2)}) = ${rawResult.toFixed(2)}`;
  } else if (formula === 'area' && shape === 'square') {
    calculationText = `យើងបាន S = ${values.side.toFixed(2)}² = ${rawResult.toFixed(2)}`;
  } else if (formula === 'perimeter' && shape === 'square') {
    calculationText = `យើងបាន P = 4 × ${values.side.toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else if (formula === 'volume' && shape === 'cone') {
    calculationText = `យើងបាន V = (១/៣) × π × ${values.radius.toFixed(2)}² × ${values.height.toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else if (formula === 'volume' && shape === 'cylinder') {
    calculationText = `យើងបាន V = π × ${values.radius.toFixed(2)}² × ${values.height.toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else if (formula === 'volume' && shape === 'cube') {
    calculationText = `យើងបាន V = ${values.side.toFixed(2)}³ = ${rawResult.toFixed(2)}`;
  } else if (formula === 'volume' && shape === 'pyramid') {
    calculationText = `យើងបាន V = (១/៣) × ${values.baseArea.toFixed(2)} × ${values.height.toFixed(2)} = ${rawResult.toFixed(2)}`;
  } else {
    calculationText = `យើងបាន លទ្ធផល = ${rawResult.toFixed(2)}`;
  }
  steps += `<div class="step"><strong>${calculationText}</strong></div>`;
  
  // Final answer: ដូចនេះ [shape] [formula] ស្មើនឹង [answer]
  const unitSuffix = meta.outputKind === 'area' ? '²' : meta.outputKind === 'volume' ? '³' : '';
  const answerText = meta.outputKind === 'volume' && (outputUnit === 'liter' || outputUnit === 'dm3') 
    ? `${result.toFixed(2)} លីត្រ`
    : `${result.toFixed(2)} ${outputUnit}${unitSuffix}`;
  steps += `<div class="step final-answer"><strong>ដូចនេះ ${shapeKh} ${formulaKh} ស្មើនឹង ${answerText}</strong></div>`;
  
  return steps;
}

function handleSubmit(event) {
  event.preventDefault();

  const shape = shapeSelect.value;
  const formula = formulaSelect.value;
  const meta = formulaMeta[shape][formula];
  const outputUnit = outputUnitSelect.value;

  // Collect values with their individual units
  const values = {};
  const fieldUnits = {};
  const fieldInputs = inputFields.querySelectorAll('input');
  
  fieldInputs.forEach((input) => {
    const fieldName = input.name;
    const fieldValue = parseFloat(input.value);
    const fieldUnit = document.querySelector(`select[name="${fieldName}-unit"]`).value;
    
    fieldUnits[fieldName] = fieldUnit;
    
    // Convert field value to output unit based on the field's input kind
    const field = meta.fields.find(f => f.name === fieldName);
    const fieldInputKind = field?.inputKind || meta.inputKind;
    
    if (fieldInputKind === 'length' && fieldUnit !== outputUnit) {
      values[fieldName] = convertLength(fieldValue, fieldUnit, outputUnit);
    } else if (fieldInputKind === 'area' && fieldUnit !== outputUnit) {
      values[fieldName] = convertArea(fieldValue, fieldUnit, outputUnit);
    } else if (fieldInputKind === 'volume' && fieldUnit !== outputUnit) {
      values[fieldName] = convertVolume(fieldValue, fieldUnit, outputUnit);
    } else {
      values[fieldName] = fieldValue;
    }
  });

  // Compute result
  const rawResult = meta.compute(values);
  
  // Result is already in output unit because inputs were converted
  const result = rawResult;

  // Build and display step-by-step solution
  const stepsHTML = buildSteps(shape, formula, meta, values, fieldUnits, outputUnit, rawResult, result);
  resultBox.innerHTML = stepsHTML;
}

shapeSelect.addEventListener('change', populateFormulaOptions);
formulaSelect.addEventListener('change', renderInputs);
form.addEventListener('submit', handleSubmit);

populateFormulaOptions();
