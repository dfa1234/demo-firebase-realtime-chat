//@ts-ignore
import format from 'date-fns/format';
import {capitalize} from "@material-ui/core";

export function formatDate(d:Date) {
    return capitalize(format(d, 'hh:mm iii d MMM y'));
}
