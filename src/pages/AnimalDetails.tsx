import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  Edit,
  Stethoscope,
  Weight,
  Activity,
  CalendarDays,
  FileText,
} from 'lucide-react'
import { animals, appointments } from '@/lib/mockData'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AnimalDetails() {
  const { id } = useParams()
  const animal = animals.find((a) => a.id === id)
  const history = appointments
    .filter((apt) => apt.animalId === id)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  if (!animal) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Animal não encontrado</h2>
        <Button asChild>
          <Link to="/animais">Voltar para lista</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/animais">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Perfil do Animal</h1>
        <div className="ml-auto flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Button>
          <Button>
            <Stethoscope className="mr-2 h-4 w-4" /> Iniciar Atendimento
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <img
                src={animal.image}
                alt={animal.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">{animal.name}</CardTitle>
                <Badge
                  variant={
                    animal.status === 'Healthy' ? 'secondary' : 'destructive'
                  }
                >
                  {animal.status === 'Healthy' ? 'Saudável' : 'Em Tratamento'}
                </Badge>
              </div>
              <CardDescription>
                {animal.species} • {animal.breed}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center gap-3 text-sm">
                <Weight className="h-4 w-4 text-muted-foreground" />
                <span>{animal.weight} kg</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{animal.age} anos</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span>ID: #{animal.id.padStart(4, '0')}</span>
              </div>
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-1">
                  Proprietário
                </p>
                <p className="font-medium">{animal.ownerName}</p>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Ver perfil do cliente
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-5">
          <Tabs defaultValue="history">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="history">Histórico Clínico</TabsTrigger>
              <TabsTrigger value="vaccines">Vacinas</TabsTrigger>
              <TabsTrigger value="exams">Exames</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="space-y-4 mt-4">
              {history.length > 0 ? (
                history.map((item) => (
                  <Card key={item.id}>
                    <CardHeader className="py-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                          <Badge variant="outline">{item.type}</Badge>
                          <span className="font-medium">
                            {format(item.date, "d 'de' MMMM, yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <Badge
                          variant={
                            item.status === 'Completed'
                              ? 'secondary'
                              : 'default'
                          }
                        >
                          {item.status === 'Completed'
                            ? 'Concluído'
                            : 'Agendado'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Atendimento realizado na clínica. Animal apresentava bom
                        estado geral.
                        {/* Mock description */}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          <FileText className="mr-1 h-3 w-3" /> Ver Receita
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                  Nenhum histórico registrado.
                </div>
              )}
            </TabsContent>
            <TabsContent value="vaccines">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Módulo de vacinas em desenvolvimento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="exams">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Nenhum exame anexado.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
