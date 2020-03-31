export type MetaTable<F extends Record<string, any>> = {
  key: Extract<keyof F, string>;
  label: React.ReactNode;
  RenderComponent?: React.ComponentType<{ rowData: F }>;
  width?: string;
  cantSort?: boolean;
}[];
