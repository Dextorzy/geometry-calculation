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
  l: 0.001,
  liter: 0.001,
  liters: 0.001,
  water: 0.001,
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

const shapeSelect = document.getElementById('shape');
const formulaSelect = document.getElementById('formula');
const inputUnitSelect = document.getElementById('input-unit');
const outputUnitSelect = document.getElementById('output-unit');
const inputFields = document.getElementById('input-fields');
const resultBox = document.getElementById('result');
const form = document.getElementById('calculator-form');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const shapeDisplay = document.getElementById('shape-display');

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
  const options = getUnitOptions(meta.inputKind);
  const outputOptions = getUnitOptions(meta.outputKind);

  inputUnitSelect.innerHTML = '';
  outputUnitSelect.innerHTML = '';

  options.forEach((unit) => {
    const option = document.createElement('option');
    option.value = unit;
    option.textContent = unit;
    inputUnitSelect.appendChild(option);
  });

  outputOptions.forEach((unit) => {
    const option = document.createElement('option');
    option.value = unit;
    option.textContent = unit;
    outputUnitSelect.appendChild(option);
  });

  inputFields.innerHTML = '';
  meta.fields.forEach((field) => {
    const label = document.createElement('label');
    label.textContent = field.label;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = 'any';
    input.name = field.name;
    input.placeholder = field.label;
    label.appendChild(input);
    inputFields.appendChild(label);
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
    if (unit === 'water' || unit === 'l' || unit === 'liter' || unit === 'liters') {
      return `${value.toFixed(2)} liters of water`;
    }
    return `${value.toFixed(2)} ${unit}³`;
  }
  return `${value.toFixed(2)} ${unit}`;
}

function buildSteps(shape, formula, meta, values, inputUnit, outputUnit, rawResult, result) {
  let steps = '';
  
  // Extract English label (remove Khmer part)
  const englishLabel = meta.label.split(' ').slice(-1)[0] || meta.label;
  
  // Build the step display
  steps += `<div class="step"><strong>Formula:</strong> ${meta.label}</div>`;
  
  // Show input values
  steps += `<div class="step"><strong>Given values:</strong>`;
  meta.fields.forEach(field => {
    const englishFieldName = field.label.split(' ').slice(-1)[0] || field.label;
    steps += `<br>• ${englishFieldName} = ${values[field.name].toFixed(2)} ${inputUnit}`;
  });
  steps += `</div>`;
  
  // Show calculation
  steps += `<div class="step"><strong>Calculation:</strong><br>`;
  
  // Add formula-specific calculation display
  if (formula === 'area' && (shape === 'circle')) {
    steps += `Area = π × radius²<br>Area = π × ${values.radius.toFixed(2)}²<br>Area = ${rawResult.toFixed(2)} ${inputUnit}²`;
  } else if (formula === 'circumference' && (shape === 'circle')) {
    steps += `Circumference = 2π × radius<br>Circumference = 2π × ${values.radius.toFixed(2)}<br>Circumference = ${rawResult.toFixed(2)} ${inputUnit}`;
  } else if (formula === 'area' && (shape === 'rectangle' || shape === 'parallelogram')) {
    const field1 = meta.fields[0].label.split(' ').slice(-1)[0];
    const field2 = meta.fields[1].label.split(' ').slice(-1)[0];
    steps += `Area = ${field1} × ${field2}<br>Area = ${values[meta.fields[0].name].toFixed(2)} × ${values[meta.fields[1].name].toFixed(2)}<br>Area = ${rawResult.toFixed(2)} ${inputUnit}²`;
  } else if (formula === 'perimeter' && (shape === 'rectangle')) {
    steps += `Perimeter = 2 × (length + width)<br>Perimeter = 2 × (${values.length.toFixed(2)} + ${values.width.toFixed(2)})<br>Perimeter = ${rawResult.toFixed(2)} ${inputUnit}`;
  } else if (formula === 'area' && (shape === 'square')) {
    steps += `Area = side²<br>Area = ${values.side.toFixed(2)}²<br>Area = ${rawResult.toFixed(2)} ${inputUnit}²`;
  } else if (formula === 'perimeter' && (shape === 'square')) {
    steps += `Perimeter = 4 × side<br>Perimeter = 4 × ${values.side.toFixed(2)}<br>Perimeter = ${rawResult.toFixed(2)} ${inputUnit}`;
  } else if (formula === 'volume' && (shape === 'cone')) {
    steps += `Volume = (1/3) × π × radius² × height<br>Volume = (1/3) × π × ${values.radius.toFixed(2)}² × ${values.height.toFixed(2)}<br>Volume = ${rawResult.toFixed(2)} ${inputUnit}³`;
  } else if (formula === 'volume' && (shape === 'cylinder')) {
    steps += `Volume = π × radius² × height<br>Volume = π × ${values.radius.toFixed(2)}² × ${values.height.toFixed(2)}<br>Volume = ${rawResult.toFixed(2)} ${inputUnit}³`;
  } else if (formula === 'volume' && (shape === 'cube')) {
    steps += `Volume = side³<br>Volume = ${values.side.toFixed(2)}³<br>Volume = ${rawResult.toFixed(2)} ${inputUnit}³`;
  } else if (formula === 'volume' && (shape === 'pyramid')) {
    steps += `Volume = (1/3) × base area × height<br>Volume = (1/3) × ${values.baseArea.toFixed(2)} × ${values.height.toFixed(2)}<br>Volume = ${rawResult.toFixed(2)} ${inputUnit}³`;
  } else {
    steps += `Result = ${rawResult.toFixed(2)} ${inputUnit}${meta.outputKind === 'area' ? '²' : meta.outputKind === 'volume' ? '³' : ''}`;
  }
  
  steps += `</div>`;
  
  // Show unit conversion if needed
  if (inputUnit !== outputUnit && (meta.outputKind === 'length' || meta.outputKind === 'area' || meta.outputKind === 'volume')) {
    steps += `<div class="step"><strong>Unit conversion:</strong><br>${rawResult.toFixed(2)} ${inputUnit}${meta.outputKind === 'area' ? '²' : meta.outputKind === 'volume' ? '³' : ''} = ${result.toFixed(2)} ${outputUnit}${meta.outputKind === 'area' ? '²' : meta.outputKind === 'volume' ? '³' : ''}</div>`;
  }
  
  // Show final answer
  steps += `<div class="step final-answer"><strong>Final Answer:</strong> ${formatResult(result, outputUnit, meta.outputKind)}</div>`;
  
  return steps;
}

function handleSubmit(event) {
  event.preventDefault();

  const shape = shapeSelect.value;
  const formula = formulaSelect.value;
  const meta = formulaMeta[shape][formula];
  const inputUnit = inputUnitSelect.value;
  const outputUnit = outputUnitSelect.value;

  const values = {};
  const fieldInputs = inputFields.querySelectorAll('input');
  fieldInputs.forEach((input) => {
    values[input.name] = parseFloat(input.value);
  });

  const rawResult = meta.compute(values);
  let result;

  if (meta.outputKind === 'length') {
    result = convertLength(rawResult, inputUnit, outputUnit);
  } else if (meta.outputKind === 'area') {
    result = convertArea(rawResult, inputUnit, outputUnit);
  } else {
    result = convertVolume(rawResult, inputUnit, outputUnit);
  }

  // Build and display step-by-step solution
  const stepsHTML = buildSteps(shape, formula, meta, values, inputUnit, outputUnit, rawResult, result);
  resultBox.innerHTML = stepsHTML;
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  const isDark = document.body.classList.contains('dark-theme');
  themeToggleBtn.textContent = isDark ? 'White' : 'Black';
}

shapeSelect.addEventListener('change', populateFormulaOptions);
formulaSelect.addEventListener('change', renderInputs);
form.addEventListener('submit', handleSubmit);
themeToggleBtn.addEventListener('click', toggleTheme);

populateFormulaOptions();
