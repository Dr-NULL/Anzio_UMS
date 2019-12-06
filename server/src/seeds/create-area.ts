import { seed } from "./core";
import { Area } from "../models/area";

export const createAreas: seed<Area> = {
    type: Area,
    data: [
        { descripc: "Informática" },
        { descripc: "Recursos Humanos" },
        { descripc: "Administración" },
        { descripc: "Aseguramiento Calidad" },
        { descripc: "Aseo Industrial" },
        { descripc: "Carne en Vara" },
        { descripc: "Carnes Despostadas" },
        { descripc: "CD Paine" },
        { descripc: "Cueros" },
        { descripc: "Desposte" },
        { descripc: "Faena" },
        { descripc: "Fca. Cecinas" },
        { descripc: "Hamburguesas" },
        { descripc: "La Dehesa" },
        { descripc: "Luis Pasteur" },
        { descripc: "Mantención" },
        { descripc: "Operación Calor" },
        { descripc: "Operación Frío" },
        { descripc: "Riles" },
        { descripc: "Sala de Ventas Concepción" },
        { descripc: "Sala de Ventas La Reina" },
        { descripc: "Sala de Ventas Mackenna" },
        { descripc: "Sala de Ventas Ovejería" },
        { descripc: "Sala de Ventas Puerto Montt" },
        { descripc: "Sala de Ventas Valdivia" },
        { descripc: "Sala Ventas de Quilpué" },
        { descripc: "Subproductos" },
        { descripc: "Terminal Concepción" },
        { descripc: "Terminal La Serena" },
        { descripc: "Terminal Quilpué" },
        { descripc: "Terminal Santiago" },
        { descripc: "Trafico de Productos" },
        { descripc: "Triperia" }
    ]
}