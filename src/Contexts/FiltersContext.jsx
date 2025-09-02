import { createContext, useContext, useState, useEffect } from "react";

const FiltersContext = createContext()

function FiltersProvider({ children }) {


    const [config, setConfig] = useState({
        1: {
            pageNumber: 1,
            setPage: () => { },
            fields: [],
            values: {},
            onChange: () => { },
            currentPage: 0
        },
        2: {
            pageNumber: 1,
            setPage: () => { },
            fields: [],
            values: {},
            onChange: () => { },
            currentPage: 0
        },
        3: {
            pageNumber: 1,
            setPage: () => { },
            fields: [],
            values: {},
            onChange: () => { },
            currentPage: 0
        }
    })

    /**
     * Set the filters configuration in the context.
     *
     * @param {number} list - identifies the correct wrapper, minimum 1 maximum 3
     * @param {number} currentPage - Current page state variable.
     * @param {number} pageNumber - Total number of pages.
     * @param {function} setPage - Page setter function.
     * @param {Array<Object>} fields - Array of objects to generate the filter UI. with the folloeing structure: { key: 'usename', label: 'Username', type: 'text' } or { key: 'usename', label: 'Username', type: 'select', options: [{key: '', label: ''}] } or { key: 'usename', label: 'Username', type: 'date' }
     * @param {Object} values - State object, initialized empty, updated via onChange.
     * @param {function} onChange - Handler to update values state.
     */
    function setFiltersConfig(list, currentPage, pageNumber, setPage, fields, values, onChange,) {
        setConfig(prev => ({
            ...prev,
            [list]: { currentPage, pageNumber, setPage, fields, values, onChange }
        }))
    }



    return (
        <>
            <FiltersContext.Provider value={{ config, setFiltersConfig }}>
                {children}
            </FiltersContext.Provider>
        </>
    )
}

function useFiltersContext() {
    const context = useContext(FiltersContext)
    return context
}

export { FiltersProvider, useFiltersContext }