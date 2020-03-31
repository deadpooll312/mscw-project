export type Pagination = {
    page: number;
    size: number;
    total: number;
};

export type MappingData = {
    isOpen: boolean;
    name: string;
    alias: string;
};

export type FieldData = {
    isOpen: boolean;
    data: FieldDataItem[];
};

export type FieldDataItem = {
    alias?: string;
    attributeId: string;
    attributeValue: string;
    id?: number;
};

export type LegendData = {
    level: string;
    color: string;
    season: string;
    description: string;
    sortOrder: number;
    minPercent: number;
    maxPercent: number;
    colorValue: string;
};