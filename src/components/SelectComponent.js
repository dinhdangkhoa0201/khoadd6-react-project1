import React from "react";
import * as uuid from "uuid";
import {constants} from "../constants";

const listOption = [
    {
        value: constants.MOVE,
        disabled: true,
        label: "Move to..."
    }, {
        value: constants.BOOKSHELF_CURRENT_VALUE,
        disabled: false,
        label: "Currently Reading"
    }, {
        value: constants.BOOKSHELF_WTR_VALUE,
        disabled: false,
        label: "Want to Read"
    }, {
        value: constants.BOOKSHELF_READ_VALUE,
        disabled: false,
        label: "Read"
    }, {
        value: constants.NONE,
        disabled: false,
        label: "None"
    }
]

export const SelectComponent = ({
    item,
    handleMoveOn,
    type
}) => {

    const handleSelect = (value) => {
        if (value && handleMoveOn) {
            handleMoveOn(item, value);
        }
    }

    const renderListOption = () => {
        return listOption.map(e => (
            <option key={uuid.v4()}
                    value={e.value}
                    label={e.label}
                    disabled={e.disabled}/>
        ))
    }

    return (
        <div className="book-shelf-changer">
            <select defaultValue={type ? type : constants.MOVE}
                    onChange={(event) => handleSelect(event.target.value)}>
                {renderListOption()}
            </select>
        </div>
    )
}
