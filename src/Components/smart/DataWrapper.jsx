import { useFiltersContext } from "../../Contexts/FiltersContext";
import { useMessageContext } from "../../Contexts/MessageContext";
import LoaderUi from "../dumb/Loader.ui";

export default function DataWrapper({ children, css, id }) {
    const { config, handleRefresh } = useFiltersContext()
    const { setLoader } = useMessageContext()

    if (config[id] == null) {
        return children
    } else if (!config[id]) {
        return <LoaderUi />;
    }

    const { setPage, pageNumber, fields = [], values = {}, onChange = () => { }, currentPage = 0 } = config[id]

    function handleChange(key, value) {
        onChange(prev => ({ ...prev, [key]: value }))
    }

    function handleNextPage() {
        setLoader(true)
        setPage(prev => prev + 1)

    }

    function handlePrevPage() {
        setLoader(true)
        setPage(prev => prev - 1)
    }

    function handlePageClick(index) {
        setLoader(true)
        setPage(index)
    }

    function resetFilters() {
        const resetValues = {}
        fields.forEach(f => {
            resetValues[f.key] = "";
        })
        onChange(resetValues)
        handleRefresh()
    }

    const pages = Array.from({ length: pageNumber })

    return (
        <>
            <div>
                <div className={css}>
                    {
                        fields.map(f => (
                            <>

                                <div className="col">
                                    <div className="mb-3">
                                        {
                                            f.type == 'select' && (
                                                <>
                                                    <div className="input-group mb-3">
                                                        <label className="input-group-text" for="inputGroupSelect01">{f.label}</label>
                                                        <select value={values[f.key]} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} className="form-select" id="inputGroupSelect01">
                                                            <option value="">All</option>
                                                            {
                                                                f.options.map(o => (
                                                                    <>
                                                                        <option key={o.value} value={o.value}>{o.label}</option>
                                                                    </>
                                                                ))
                                                            }

                                                        </select>
                                                    </div>

                                                </>
                                            )
                                        }
                                        {
                                            f.type == 'text' && (
                                                <>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1">{f.label}</span>
                                                        <input value={values[f.key] ?? ''} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" className="form-control" placeholder={f.label} aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                </>
                                            )
                                        }
                                        {
                                            f.type == 'date' && (
                                                <>
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text" id="basic-addon1">{f.label}</span>
                                                        <input value={values[f.key]} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} type="datetime-local" className="form-control" placeholder={f.label} aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                            </>
                        ))
                    }
                </div>
                {
                    fields.length > 0 && (
                        <>
                            <div className="d-flex gap-4">
                                <div className=""><button className="btn btn-success" onClick={() => handleRefresh()}>Apply Filters</button></div>
                                <div className=""><button onClick={() => resetFilters()} className="btn btn-outline-danger">Reset Filters</button></div>
                            </div>
                        </>
                    )
                }
            </div>


            {children}


            {
                pageNumber > 1 && <div className="w-100 d-flex align-items-center justify-content-center">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            {
                                currentPage > 0 && <li className="page-item">
                                    <button className="page-link" onClick={() => handlePrevPage()} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                            }

                            {
                                pages.map((item, i) => (
                                    <>
                                        <li className={`page-item ${currentPage == i && 'active'}`}><button disabled={currentPage == i} className="page-link" onClick={() => handlePageClick(i)}>{i + 1}</button></li>
                                    </>
                                ))
                            }
                            {
                                currentPage < pageNumber - 1 && <li className="page-item">
                                    <button className="page-link" onClick={() => handleNextPage()} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </button>
                                </li>
                            }
                        </ul>
                    </nav>
                </div>
            }
        </>
    )
}