// GLOBAL
export const BranchesChoices = [
    { label: 'SPO', value: 1 },
    { label: 'REC', value: 2 },
    { label: 'SSA', value: 3 },
    { label: 'FOR', value: 4 },
    { label: 'MCZ', value: 5 },
    { label: 'NAT', value: 6 },
    { label: 'JPA', value: 7 },
    { label: 'AJU', value: 8 },
    { label: 'VDC', value: 9 },
    { label: 'CTG', value: 10 },
    { label: 'GVR', value: 11 },
    { label: 'VIX', value: 12 },
    { label: 'TCO', value: 13 },
    { label: 'UDI', value: 14 },
    { label: 'BMA', value: 15 },
    { label: 'BPE', value: 16 },
    { label: 'BEL', value: 17 },
    { label: 'BPB', value: 18 },
    { label: 'SLZ', value: 19 },
    { label: 'BAL', value: 20 },
    { label: 'THE', value: 21 },
    { label: 'BMG', value: 22 },
    { label: 'FMA', value: 23 },
    { label: 'JSR', value: 24 },
    { label: 'JC', value: 25 },
].map(item => ({ label: item.label, value: item.value }));


// PALLET
export const TypePalletChoices = [
    "PBR", "CHEP"
].map(item => ({ label: item, value: item }));


// PURCHASE REQUEST
export const StatusChoices = [
    "ABERTO", "ANDAMENTO", "CONCLUIDO", "CANCELADO",
].map(item => ({ label: item, value: item }));

export const DepartmentChoices = [
    { label: "NÃO INFORMADO", value: "NAO INFORMADO" },
    { label: "DIRETORIA", value: "DIRETORIA" },
    { label: "FATURAMENTO", value: "FATURAMENTO" },
    { label: "FINANCEIRO", value: "FINANCEIRO" },
    { label: "RH", value: "RH" },
    { label: "FISCAL", value: "FISCAL" },
    { label: "MONITORAMENTO", value: "MONITORAMENTO" },
    { label: "OPERACIONAL", value: "OPERACIONAL" },
    { label: "FROTA", value: "FROTA" },
    { label: "EXPEDIÇÃO", value: "EXPEDICAO" },
    { label: "COMERCIAL", value: "COMERCIAL" },
    { label: "JURÍDICO", value: "JURIDICO" },
    { label: "DESENVOLVIMENTO", value: "DESENVOLVIMENTO" },
    { label: "TI", value: "TI" },
    { label: "FILIAIS", value: "FILIAIS" },
    { label: "COMPRAS", value: "COMPRAS" },
].map(item => ({ label: item.label, value: item.value }));

export const FormPaymentChoices = [
    { label: "NÃO INFORMADO", value: "NAO INFORMADO" },
    { label: "A VISTA", value: "A VISTA" },
    { label: "PARCELADO 1X", value: "PARCELADO 1X" },
    { label: "PARCELADO 2X", value: "PARCELADO 2X" },
    { label: "PARCELADO 3X", value: "PARCELADO 3X" },
    { label: "PARCELADO 4X", value: "PARCELADO 4X" },
    { label: "PARCELADO 5X", value: "PARCELADO 5X" },
    { label: "PARCELADO 6X", value: "PARCELADO 6X" },
    { label: "PARCELADO 7X", value: "PARCELADO 7X" },
    { label: "PARCELADO 8X", value: "PARCELADO 8X" },
    { label: "PARCELADO 9X", value: "PARCELADO 9X" },
    { label: "PARCELADO 10X", value: "PARCELADO 10X" },
    { label: "PARCELADO 11X", value: "PARCELADO 11X" },
    { label: "PARCELADO 12X", value: "PARCELADO 12X" },
].map(item => ({ label: item.label, value: item.value }));

export const CategoryChoices = [
    { label: "NÃO INFORMADO", value: "NAO INFORMADO" },
    { label: "ALMOXARIFADO", value: "ALMOXARIFADO" },
    { label: "COTAÇÃO", value: "COTACAO" },
    { label: "NOTA FISCAL", value: "NOTA FISCAL" },
].map(item => ({ label: item.label, value: item.value }));

export const CompanyChoices = [
    { label: "BORA", value: "BORA" },
    { label: "BORBON", value: "BORBON" },
    { label: "JC", value: "JC" },
    { label: "JSR", value: "JSR" },
    { label: "TRANSFOOD", value: "TRANSFOOD" },
].map(item => ({ label: item.label, value: item.value }));