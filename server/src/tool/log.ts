import moment from "moment"

export module Log {
    export function title() {
        console.clear()
        console.log(` //===============================================\\\\`)
        console.log(`//--------------->>>  Anzio UMS  <<<---------------\\\\`)
        console.log(`\\\\=================================================//\n`)
    }

    function show(label: string, text: string) {
        let now = new Date()
        let out = moment().format("YYYY/MM/DD HH:mm:ss")
        out += ` -> [${label}]: `
        out += text
        console.log(out)
    }

    export function ln(text: string = "") {
        let out = "                   "
        out += `            `
        out += text
        console.log(out)
    }

    export function ev(text: string, timestamp: boolean = true) {
        show(" EV ", text)
    }

    export function ok(text: string, timestamp: boolean = true) {
        show(" OK ", text)
    }

    export function er(text: string, timestamp: boolean = true) {
        show("FAIL", text)
    }

    export function sep() {
        console.log(`---------------------------------------------------------------------------------\n`)
    }
}
export default Log