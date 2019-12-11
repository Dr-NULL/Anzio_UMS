import crypto from "crypto"

export class Secret {
    private _key: Buffer
    public get key() {
        return this._key.toJSON().data
    }
    public set key(v: number[]) {
        let tmp = Buffer.from(v)
        this._key = Buffer.alloc(16, tmp, "utf8")
    }

    private _iv: Buffer
    public get iv() {
        return this._iv.toJSON().data
    }
    public set iv(v: number[]) {
        let tmp = Buffer.from(v)
        this._iv = Buffer.alloc(8, tmp, "utf8")
    }

    constructor() {
        this._key = Buffer.from(crypto.randomBytes(16))
        this._iv = Buffer.from(crypto.randomBytes(8))
    }

    public encrypt(text: string) {
        let cipher = crypto.createCipheriv("aes-128-gcm", this._key, this._iv)
        let data = Buffer.concat([
            cipher.update(text),
            cipher.final()
        ])

        return data.toString("hex")
    }

    public decrypt(text: string) {
        let cipher = crypto.createCipheriv("aes-128-gcm", this._key, this._iv)
        let data = Buffer.concat([
            cipher.update(Buffer.from(text, "hex")),
            cipher.final()
        ])

        return data.toString("utf8")
    }
}
