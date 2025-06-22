"use client"

import { Chart, useChart } from "@chakra-ui/charts"
import { HStack } from "@chakra-ui/react"
import { FC } from "react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
interface Props {
    data: {amount: number, value: number}[],
    xLabel: string
}
const StatisticsLineChart:FC<Props> = ({data, xLabel}) => {
  const chart = useChart({
    data,
    series: [{ name: "amount", color: "teal.solid" }],
  })

  return (
    <HStack justifyContent={'center'}>
      <Chart.Root maxH="sm" chart={chart} width={"80vw"}>
        <LineChart data={chart.data}>
          <CartesianGrid stroke={chart.color("border")} vertical={false} />
          <XAxis
            axisLine={false}
            dataKey={chart.key("value")}
            stroke={chart.color("border")}
            label={{ value: xLabel, position: "bottom" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke={chart.color("border")}
            label={{ value: "Employees", position: "left", angle: -90 }}
          />
          <Tooltip
            animationDuration={100}
            cursor={false}
            content={<Chart.Tooltip />}
          />
          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </HStack>
  )
}
export default StatisticsLineChart
