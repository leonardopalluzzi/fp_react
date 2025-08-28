import { Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

export default function LinearGraphUi({data, action}){
    return(
        <>
        <div className="container h-75 w-100">
                                        <ResponsiveContainer>
                                            <BarChart data={data}>
                                                <XAxis dataKey={'name'} />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey={'value'}>
                                                    {
                                                        data.map((item, i) => (
                                                            <Cell key={`cell-${i}`} fill={`${item.fill}`} />
                                                        ))
                                                    }
                                                </Bar>
                                            </BarChart>
    
                                        </ResponsiveContainer>
                                        {
                                            action ? <Link to={action} className="btn btn-outline-dark no-drag">Details</Link> : null
                                        }
                                    </div>
        </>
    )
}