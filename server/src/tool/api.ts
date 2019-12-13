import { Request, Response } from "express";

//Extender Response
declare global {
    namespace Express {
        export interface Response{
            api: Api
        }
    }
}

//Interface de Entrada para errores
export interface Fail{
    status: 
    /* Informational responses */
    "100" | "101" | "102" | "103" | 

    /* Successful responses */ 
    "200" | "201" | "202" | "203" | "204" | "205" | "206" | "207" | "208" | "226" |

    /* Redirection messages */
    "300" | "301" | "302" | "303" | "304" | "306" | "307" | "308" |

    /* Client error response */
    "400" | "401" | "402" | "403" | "404" | "405" | "406" | "407" | "408" | "409" | "410" | 
    "411" | "412" | "413" | "414" | "415" | "416" | "417" | "418" | "421" | "422" | "423" | 
    "424" | "425" | "426" | "428" | "429" | "431" | "451" | 

    /* Server error responses */
    "500" | "501" | "502" | "503" | "504" | "505" | "506" | "507" | "508" | "510" | "511"

    detail: string;
}

interface ApiError extends Fail {
    title?: string;
    source?: ApiErrorSource;
}

interface ApiErrorSource {
    pointer: string;
    parameter: any;
}

export class Api {
    private meta = {
        brand: "Frigosorno S.A.",
        country: "Chile",
        authors: [
            "Felipe Silva"
        ]
    }

    private req: Request
    private res: Response

    constructor(req: Request, res: Response){
        this.req = req
        this.res = res
    }

    public success(data: any) {
        this.res.contentType("application/vnd.api+json")
        this.res.send({
            data: data,
            meta: this.meta
        })
    }

    public failed(...fail: Fail[]) {
        //Configurar errores
        const errors = fail.map((x: ApiError) => {
            x.source = {
                pointer: this.req.originalUrl,
                parameter: this.req.params
            }

            switch (x.status) {
                case "100":
                    x.title = "Continue"
                    break
                case "101":
                    x.title = "Switching Protocol"
                    break
                case "102":
                    x.title = "Processing (WebDAV)"
                    break
                case "103":
                    x.title = "Early Hints"
                    break
                case "200":
                    x.title = "OK"
                    break
                case "201":
                    x.title = "Created"
                    break
                case "202":
                    x.title = "Accepted"
                    break
                case "203":
                    x.title = "Non-Authoritative Information"
                    break
                case "204":
                    x.title = "No Content"
                    break
                case "205":
                    x.title = "Reset Content"
                    break
                case "206":
                    x.title = "Partial content"
                    break
                case "207":
                    x.title = "Multi-Status"
                    break
                case "208":
                    x.title = "Already Reported"
                    break
                case "226":
                    x.title = "IM Used"
                    break
                case "300":
                    x.title = "Multiple Choice"
                    break
                case "301":
                    x.title = "Moved Permanently"
                    break
                case "302":
                    x.title = "Found"
                    break
                case "303":
                    x.title = "See Other"
                    break
                case "304":
                    x.title = "Not Modified"
                    break
                case "306":
                    x.title = "Unused"
                    break
                case "307":
                    x.title = "Temporary Redirect"
                    break
                case "308":
                    x.title = "Permanent Redirect"
                    break
                case "400":
                    x.title = "Bad Request"
                    break
                case "401":
                    x.title = "Unauthorized"
                    break
                case "402":
                    x.title = "Payment Required"
                    break
                case "403":
                    x.title = "Forbidden"
                    break
                case "404":
                    x.title = "Not Found"
                    break
                case "405":
                    x.title = "Method Not Allowed"
                    break
                case "406":
                    x.title = "Not Acceptable"
                    break
                case "407":
                    x.title = "Proxy Authentication Required"
                    break
                case "408":
                    x.title = "Request Timeout"
                    break
                case "409":
                    x.title = "Conflict"
                    break
                case "410":
                    x.title = "Gone"
                    break
                case "411":
                    x.title = "length Required"
                    break
                case "412":
                    x.title = "Precondition Failed"
                    break
                case "413":
                    x.title = "Payload Too Large"
                    break
                case "414":
                    x.title = "URI Too Long"
                    break
                case "415":
                    x.title = "Unsupported Media Type"
                    break
                case "416":
                    x.title = "Requested Range Not Satisfiable"
                    break
                case "417":
                    x.title = "Expectation Failed"
                    break
                case "418":
                    x.title = "I'm a teapot"
                    break
                case "421":
                    x.title = "Misdirected Required"
                    break
                case "422":
                    x.title = "Unprocessable Entity"
                    break
                case "423":
                    x.title = "Locked"
                    break
                case "424":
                    x.title = "Failed Dependency"
                    break
                case "425":
                    x.title = "Too Early"
                    break
                case "426":
                    x.title = "Upgrade Required"
                    break
                case "428":
                    x.title = "Precondition Required"
                    break
                case "429":
                    x.title = "Too Many Requests"
                    break
                case "431":
                    x.title = "Request Header Fields Too Large"
                    break
                case "451":
                    x.title = "Unavailable For Legal Reasons"
                    break
                case "500":
                    x.title = "Internal Server Error"
                    break
                case "501":
                    x.title = "Not Implemented"
                    break
                case "502":
                    x.title = "Bad Gateway"
                    break
                case "503":
                    x.title = "Service Unavailable"
                    break
                case "504":
                    x.title = "Gateway Timeout"
                    break
                case "505":
                    x.title = "HTTP Version Not Supported"
                    break
                case "506":
                    x.title = "Variant Also Negotiates"
                    break
                case "507":
                    x.title = "Insuficient Storage(WebDAV)"
                    break
                case "508":
                    x.title = "Loop Detected(WebDAV)"
                    break
                case "510":
                    x.title = "Not Extended"
                    break
                case "511":
                    x.title = "Network Authentication Required"
            }
        })

        this.res.contentType("application/vnd.api+json")
        this.res.send({
            errors: fail,
            meta: this.meta
        })
    }
}