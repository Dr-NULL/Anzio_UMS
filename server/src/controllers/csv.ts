import { EndPoint } from "../tool/endpoint";
import { IntLoad } from "../models/int-load";
import { File } from "../tool/file";
import moment from "moment";

export const upload = new EndPoint()
upload.method = "form-data"
upload.path = "/csv/upload"
upload.fileReceive.push({ name: "data" })
upload.callback = async (req, res) => {
    try {
        const inst: any = (req.files as any).data[0]
        const csv = new File(inst.destination + "\\" + inst.filename)

        //Obtener líneas del archivo
        IntLoad.clear()
        const raw = csv.readTextSync()
            .replace(/\n$/gi, "")
            .split("\n")
            
        //Obtener Celdas
        csv.kill()
        raw.shift()
        for (let row of raw) {
            let cell = row
                .split(/;/gi)
                .map(x => x
                    .trim()
                    .replace(/\s+/gi, " ")
                )

            //Obtener Nombre
            if (cell[0].length > 0) {
                let rawName = cell[1].split(/\,/gi)
                let rawLastN = rawName[0].split(/\s/gi)
                while (rawLastN.length < 2) { rawLastN.push("") } 
        
                //Insertar en interfaz de paso
                let int = new IntLoad()
                int.rut = cell[0]
                int.nombres = rawName[1]
                int.apellidoP = rawLastN[0]
                int.apellidoM = rawLastN[1]
                int.area = cell[2]
                int.cargo = cell[3]
                int.sexo = cell[4]
                int.fechaNacim = moment(cell[5], 'DD-MM-YYYY').toDate(),
                int.jefeRUT = cell[6]
                int.email = cell[7]
                await int.save()
            }
        }

        res.api.send(null)
    } catch (err) {
        res.api.catch(err)
    }
}