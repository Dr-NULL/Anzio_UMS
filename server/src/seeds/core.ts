//Tipo Semilla
export type seed<T> = { 
    type: new() => T,
    data: Array<{[K in keyof T]?: T[K]}>
}

//Execute
import { createConnection } from "typeorm";
import { queue } from "../seeds";
import { Log } from "../tool/log";

export async function execute() {
    createConnection().then(async conn => {
        console.clear()
        Log.ev("Inicio proceso...")
        Log.ln("↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓")
        for (let x = 0; x < queue.length; x++) {
            const rep = conn.getRepository(queue[x].type)
            await rep.delete({})
            
            Log.ev(`Modelo -> ${queue[x].type.name}`)
            for (let y = 0; y < queue[x].data.length; y++) {
                let inst = new queue[x].type()
                inst = queue[x].data[y]
    
                rep.save(inst)
            }
        }
    
        Log.ln("↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑")
        Log.ok("Fin proceso!")
        setTimeout(() => {
            conn.close()
        }, 1500);
    })
} 
