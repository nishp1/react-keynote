import applescript from "applescript";
import { promisify } from "util";

export default promisify(applescript.execString.bind(applescript));
