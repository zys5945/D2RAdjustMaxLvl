const EXP_FILENAME = "global\\excel\\experience.txt";
const EXP_TABLE = D2RMM.readTsv(EXP_FILENAME);

const NON_CLASS_COLUMNS = ["Level", "ExpRatio"];
const CLASS_COLUMNS = EXP_TABLE.headers.filter(
  (col) => !NON_CLASS_COLUMNS.includes(col)
);

const NN_EXP = 3837739017;

if (config.maxLevel < 99) {
  // decrease max level
  EXP_TABLE.rows = EXP_TABLE.rows.slice(0, config.maxLevel + 2);
} else {
  // increase max level
  for (let i = 100; i <= config.maxLevel; i++) {
    const lastRow = EXP_TABLE.rows[EXP_TABLE.rows.length - 1];
    const newRow = { ...lastRow };
    newRow["Level"] = i;
    for (const col of CLASS_COLUMNS) {
      newRow[col] = NN_EXP + 1000 * (i - 99);
    }
    EXP_TABLE.rows.push(newRow);
  }
}
// set max level
for (const row of EXP_TABLE.rows) {
  if (row["Level"] == "MaxLvl") {
    for (const col of CLASS_COLUMNS) {
      row[col] = config.maxLevel;
    }
    break;
  }
}
D2RMM.writeTsv(EXP_FILENAME, EXP_TABLE);
