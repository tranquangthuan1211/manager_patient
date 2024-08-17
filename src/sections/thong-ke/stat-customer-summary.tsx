import { FC } from "react";
import {
    Avatar,
    Card,
    CardContent,
    Stack,
    Typography,
    useTheme,
    Paper,
    Icon,
} from "@mui/material";
import Chart from "react-apexcharts";
type ChartSeries = {
    name: string;
    data: (number | null)[];
  }[];
interface StatCustomerSummaryProp {
    chartSeries: ChartSeries;
}


export const StatCustomerSummary: FC<StatCustomerSummaryProp> = (props) => {
    const { chartSeries } = props;
    const options =  {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12"
          ]
        }
    }
    return (
    <div>
        <Card>
            <CardContent>    
                <Chart
                    height={240}
                    width={"100%"}
                    options={options}
                    series={chartSeries}
                    type="line"
                />
            </CardContent>
        </Card>
     </div>
    )
}