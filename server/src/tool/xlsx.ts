import Xlsx from "xlsx";

export class Excel {
    public readonly table: Table[];
    public readonly tableName: string[];

    constructor(raw: Buffer) {
        const file = Xlsx.read(raw)
        this.table = []
        this.tableName = []

        for (let name of file.SheetNames) {
            this.tableName.push(name)
            this.table.push(new Table(
                file.Sheets[name],
                name    
            ))
        }
    }

    getTableByName(name: string) {
        let ref: Xlsx.WorkSheet = null
        for (let table of this.table) {
            if (table.name == name) {
                ref = table
                break
            }
        }

        return ref
    }
}

export class Table {
    private _ref: Xlsx.WorkSheet;
    private _col: string[];

    public readonly name: string;
    public readonly data: Xlsx.CellObject[][];

    constructor(sheet: Xlsx.WorkSheet, name: string) {
        this._ref = sheet
        this._col = []
        this.name = name
        this.data = []

        // Obtener referencia de dimensiones de la tabla
        let colLabel = this._ref["!ref"].match(/[a-z]+/gi)
        let rowLabel = this._ref["!ref"].match(/[0-9]+/gi)

        // Columns Ref
        const a = "A".charCodeAt(0)
        const z = "Z".charCodeAt(0)
        this._col.push(colLabel[0])

        // Llenar columnas
        while(this._col[this._col.length - 1] != colLabel[1]) {
            // Obtener charcodes en reversa del último ítem
            const item = this._col[this._col.length - 1]
                .split('')
                .map(x => x.charCodeAt(0))
                .reverse()


            let num: number[] = []
            let add = true
            for (let ch of item) {
                // Agregar +1 al carácter actual
                if (add) {
                    ch++
                }

                // Comprobar valor del carácter
                if (ch <= z) {
                    add = false
                    num.push(ch)
                } else {
                    add = true
                    num.push(a)
                }
            }

            let out = ""
            for (let ch of num) {
                out = String.fromCharCode(ch) + out
            }
            this._col.push(out)
        }

        // Crear Filas y Celdas
        for (let i = 1; i <= parseInt(rowLabel[1]); i++) {
            let row: Xlsx.CellObject[] = []
            let nul = true
            for (let l of this._col) {
                const cell = this._ref[`${l}${i}`]
                if (cell != undefined) {
                    nul = null
                }
                row.push(cell)
            }

            this.data.push(row)
        }
    }
}