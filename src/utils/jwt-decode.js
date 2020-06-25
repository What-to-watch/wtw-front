import { Try } from "@juan-utils/ramda-structures";

const parse = x => JSON.parse(atob(x))

const jwtDecode = (token) => {
    const [ header, payload, verify] = token.split(".");
    return Try.from(() => ({
        header: parse(header),
        payload: parse(payload),
        verify,
    }))
}

export default jwtDecode;