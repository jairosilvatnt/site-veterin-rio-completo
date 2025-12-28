import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  CalendarDays,
  Activity,
  Users,
  TrendingUp,
  MoreHorizontal,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { appointments, animals } from '@/lib/mockData'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export default function Index() {
  const nextAppointments = appointments
    .filter((a) => a.status === 'Scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 5)

  const activeFollowUps = animals.filter((a) => a.status !== 'Healthy')

  const chartData = [
    { name: 'Bovinos', value: 45, fill: 'hsl(var(--chart-1))' },
    { name: 'Equinos', value: 12, fill: 'hsl(var(--chart-2))' },
    { name: 'Caninos', value: 28, fill: 'hsl(var(--chart-3))' },
    { name: 'Felinos', value: 15, fill: 'hsl(var(--chart-4))' },
  ]

  const chartConfig = {
    value: { label: 'Animais' },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Bem-vindo ao sistema de gestão veterinária.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link to="/agenda">Ver Agenda Completa</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atendimentos Hoje
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde ontem</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Acompanhamentos
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeFollowUps.length}</div>
            <p className="text-xs text-muted-foreground">
              Animais em tratamento
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Novos Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+4</div>
            <p className="text-xs text-muted-foreground">Neste mês</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orçamentos Pendentes
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 4.5k</div>
            <p className="text-xs text-muted-foreground">
              Aguardando aprovação
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Próximos Atendimentos</CardTitle>
            <CardDescription>
              Você tem {nextAppointments.length} atendimentos agendados em
              breve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded border bg-muted text-xs font-bold text-muted-foreground">
                      <span>{format(apt.date, 'dd')}</span>
                      <span className="uppercase">
                        {format(apt.date, 'MMM', { locale: ptBR })}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {apt.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {apt.animalName} • {apt.clientName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        apt.type === 'Surgery' ? 'destructive' : 'secondary'
                      }
                    >
                      {apt.type === 'Surgery'
                        ? 'Cirurgia'
                        : apt.type === 'Vaccination'
                          ? 'Vacina'
                          : 'Consulta'}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle>Estatísticas Rápidas</CardTitle>
            <CardDescription>
              Distribuição de animais por espécie.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  fontSize={12}
                />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Acompanhamentos em Andamento</CardTitle>
            <CardDescription>
              Animais que necessitam de atenção especial ou tratamento contínuo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeFollowUps.map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <Avatar className="h-12 w-12 rounded-lg border">
                    <AvatarImage
                      src={animal.image}
                      alt={animal.name}
                      className="object-cover"
                    />
                    <AvatarFallback>{animal.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">
                        {animal.name}
                      </p>
                      <Badge
                        variant={
                          animal.status === 'Recovery'
                            ? 'default'
                            : 'destructive'
                        }
                        className="text-[10px]"
                      >
                        {animal.status === 'Recovery'
                          ? 'Recuperação'
                          : 'Tratamento'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {animal.species} • {animal.ownerName}
                    </p>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: animal.status === 'Recovery' ? '80%' : '30%',
                        }}
                      />
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/animais`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              {activeFollowUps.length === 0 && (
                <div className="col-span-full py-8 text-center text-muted-foreground">
                  Nenhum acompanhamento ativo no momento.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
