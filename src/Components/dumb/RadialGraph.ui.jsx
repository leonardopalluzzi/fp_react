import { RadialBarChart, RadialBar, Legend, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

export default function RadialGraphUi({data, action}){
    return(
        <>
        <div className="container h-75 w-100">
                                        <ResponsiveContainer>
                                            <RadialBarChart
                                                innerRadius="20%"
                                                outerRadius="90%"
                                                startAngle={180}
                                                endAngle={0}
                                                data={data} 
                                                cx={'50%'}
                                                cy={'50%'}
                                                margin={{top: 0, bottom: 0}}
                                            >
                                                <RadialBar
                                                    minAngle={15}
                                                    background
                                                    clockWise
                                                    dataKey="value"
                                                    nameKey="name"
                                                    label={{ position: 'insideStart', fill: '#fff' }}
                                                >
                                                    {data.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
    
                                                </RadialBar>
                                                <Legend
                                                    layout="vertical"
                                                    align="center"
                                                    verticalAlign="bottom"
                                                    iconSize={12}
                                                    content={({ payload }) => (
                                                        <ul style={{ listStyle: 'none', padding: 0 }}>
                                                            {payload.map((entry, index) => (
                                                                <li key={`legend-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                                                                <div
                                                                className=""
                                                                    style={{
                                                                    width: 12,
                                                                    height: 12,
                                                                    backgroundColor: entry.color,
                                                                    marginRight: 8,
                                                                    borderRadius: 2
                                                                    }}
                                                                />
                                                                <span style={{ fontSize: '14px' }}>{entry.value}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    />
                                                <Tooltip formatter={(value, name, props) => [`${value}`, `${props.payload.name}`]} />
                                            </RadialBarChart>
                                        </ResponsiveContainer>
                                        {
                                            action ? <Link to={action} className="btn btn-outline-dark no-drag">Details</Link> : null
                                        }
                                    </div>
        </>
    )
}