import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

export default function PieGraphUi({data, action}){
    return(
        <>
        <div className="container h-75 w-100">
                                        <ResponsiveContainer>
                                            <PieChart margin={{ top: 0, right: 20, bottom: 20, left: 20 }}>
                                                <Pie
                                                    data={data}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={120}
                                                    label
                                                >
                                                    {data.map((entry, index) => (
                                                        <Cell key={index} fill={data[index].fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        {
                                            action ? <Link to={action} className="btn btn-outline-dark no-drag">Details</Link> : null
                                        }

                                    </div>
        
        </>
    )
}