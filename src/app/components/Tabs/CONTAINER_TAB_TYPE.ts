// value: "Label"
export const MAP_TYPE_OBJ = {
  ceremony: "Ceremony",
  reception: "Reception",
  all: "Both",
} as const;

export type MAP_TYPE_VALUES = keyof typeof MAP_TYPE_OBJ;
export type MAP_TYPE_LABELS = (typeof MAP_TYPE_OBJ)[MAP_TYPE_VALUES];

interface ContainerTabOption {
  value: MAP_TYPE_VALUES;
  label: MAP_TYPE_LABELS;
}
export const mapTypeOptions: ContainerTabOption[] = Object.keys(
  MAP_TYPE_OBJ
).map((key) => ({
  value: key as MAP_TYPE_VALUES,
  label: MAP_TYPE_OBJ[key as MAP_TYPE_VALUES],
}));
