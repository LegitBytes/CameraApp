import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
export const useTileStyles = makeStyles((theme: Theme) => createStyles({
    button: {
        color: "#0079FE"
    },
    root: {
        minHeight: 330
    }
}))