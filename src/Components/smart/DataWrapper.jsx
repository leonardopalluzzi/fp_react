import { useState } from "react"

export default function DataWrapper({ children, setPage, pageNumber, fields, values, onChange, currentPage }) {
    console.log(fields);


    function handleChange(key, value) {
        onChange({ ...values, [key]: value })
    }

    function resetFilters() {
        const resetValues = {}
        fields.forEach(f => {
            resetValues[f.key] = "";
        })
        onChange(resetValues)
    }

    const pages = Array.from({ length: pageNumber })

    return (
        <>
            <div>
                {
                    fields.map(f => (
                        <>
                            <div className="mb-3">
                                {
                                    f.type == 'select' && (
                                        <>
                                            <div class="input-group mb-3">
                                                <label class="input-group-text" for="inputGroupSelect01">{f.label}</label>
                                                <select value={values[f.key]} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} class="form-select" id="inputGroupSelect01">
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
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">{f.label}</span>
                                                <input value={values[f.key]} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} type="text" class="form-control" placeholder={f.label} aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </>
                                    )
                                }
                                {
                                    f.type == 'date' && (
                                        <>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">{f.label}</span>
                                                <input value={values[f.key]} name={f.key} onChange={(e) => handleChange(e.target.name, e.target.value)} type="datetime-local" class="form-control" placeholder={f.label} aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </>
                    ))
                }
                <div>
                    <button onClick={() => resetFilters()} className="btn btn-outline-danger">Reset Filters</button>
                </div>
            </div>


            {children}


            <div className="w-100 d-flex align-items-center justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {
                            currentPage > 0 && <li class="page-item">
                                <a class="page-link" onClick={() => setPage(prev => prev - 1)} aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                        }

                        {
                            pages.map((item, i) => (
                                <>
                                    <li class="page-item"><a class="page-link" onClick={() => setPage(i)}>{i + 1}</a></li>
                                </>
                            ))
                        }
                        {
                            currentPage < pageNumber - 1 && <li class="page-item">
                                <a class="page-link" onClick={() => setPage(prev => prev + 1)} aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        }
                    </ul>
                </nav>
            </div>

        </>
    )
}