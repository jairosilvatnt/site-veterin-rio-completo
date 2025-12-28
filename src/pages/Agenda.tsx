import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Clock, MapPin } from 'lucide-react'
import { ptBR } from 'date-fns/locale'
import { format, isSameDay } from 'date-fns'
import { appointments } from '@/lib/mockData'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)

  const selectedAppointments = appointments.filter(
    (apt) => date && isSameDay(apt.date, date),
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row h-[calc(100vh-8rem)]">
      <Card className="flex-1 lg:max-w-md shadow-sm h-full flex flex-col">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={ptBR}
            className="rounded-md border shadow-sm w-full"
            classNames={{
              day_today: 'bg-accent text-accent-foreground font-bold',
            }}
          />
        </CardContent>
      </Card>

      <div className="flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {date
                ? format(date, "EEEE, d 'de' MMMM", { locale: ptBR })
                : 'Selecione uma data'}
            </h2>
            <p className="text-muted-foreground">
              {selectedAppointments.length} agendamento(s) para este dia.
            </p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Novo Agendamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Agendamento</DialogTitle>
                <DialogDescription>
                  Preencha os dados para criar um novo compromisso.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="title"
                    placeholder="Ex: Vacinação"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="animal" className="text-right">
                    Animal
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione o animal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rex">Rex (Canino)</SelectItem>
                      <SelectItem value="mimosa">Mimosa (Bovino)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Horário
                  </Label>
                  <Input id="time" type="time" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsOpen(false)}>Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {selectedAppointments.length > 0 ? (
            selectedAppointments.map((apt) => (
              <Card
                key={apt.id}
                className="shadow-sm border-l-4 border-l-primary transition-all hover:shadow-md"
              >
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{apt.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {apt.type === 'Surgery'
                          ? 'Cirurgia'
                          : apt.type === 'Vaccination'
                            ? 'Vacina'
                            : 'Consulta'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {apt.animalName} ({apt.clientName})
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> 09:00 - 10:00
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Clínica Principal
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Detalhes
                    </Button>
                    <Button
                      size="sm"
                      variant={
                        apt.status === 'Completed' ? 'secondary' : 'default'
                      }
                    >
                      {apt.status === 'Completed' ? 'Concluído' : 'Iniciar'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 border rounded-lg border-dashed bg-muted/20 text-muted-foreground">
              <Calendar className="h-10 w-10 mb-2 opacity-20" />
              <p>Nenhum agendamento para este dia.</p>
              <Button variant="link" onClick={() => setIsOpen(true)}>
                Agendar agora
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
