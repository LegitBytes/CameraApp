import React from 'react'
import { makeStyles, Theme } from "@material-ui/core/styles"
import clsx from "clsx"
import { status } from '../Components/Interfaces'
import { ClassNameMap } from '@material-ui/styles'
const useStyles = makeStyles<Theme>((theme: Theme) => ({
    base: {
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 20,
        height: 25,
        padding: 5,
    },
    active: {
        background: "#28A745",
        color: "#fff"
    },
    inactive: {
        background: "#FFC107",
        color: "#fff"
    }

}))

interface StatusChipProps {
    status: status,
    handleChange: () => void
}

const StatusChip: React.FC<StatusChipProps> = ({ status, handleChange }) => {
    const classes: ClassNameMap<"base" | "active" | "inactive"> = useStyles()
        return <>
            <div className={clsx(classes.base,classes[status])} onClick={handleChange} >
                <p>
                    {status.toUpperCase()}
                </p>
            </div>
        </>
}

export default StatusChip