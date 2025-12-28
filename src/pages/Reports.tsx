import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
} from 'recharts'

export default function Reports() {
  const revenueData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Fev', revenue: 15000 },
    { month: 'Mar', revenue: 11200 },
    { month: 'Abr', revenue: 18900 },
    { month: 'Mai', revenue: 21000 },
    { month: 'Jun', revenue: 19500 },
  ]

  const medicationData = [
    { name: 'Vacinas', usage: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Antibióticos', usage: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Vermífugos', usage: 300, fill: 'hsl(var(--chart-3))' },
    { name: 'Suplementos', usage: 200, fill: 'hsl(var(--chart-4))' },
  ]

  const chartConfig = {
    revenue: { label: 'Receita (R$)', color: 'hsl(var(--primary))' },
    usage: { label: 'Uso' },
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Relatórios de Desempenho
        </h1>
        <p className="text-muted-foreground">Análise detalhada da clínica.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Semestral</CardTitle>
            <CardDescription>
              Crescimento de receita nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias de Produtos</CardTitle>
            <CardDescription>Medicamentos mais utilizados.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie
                  data={medicationData}
                  dataKey="usage"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
