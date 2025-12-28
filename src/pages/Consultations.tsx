import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Printer, Save, Plus, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { medications } from '@/lib/mockData'

export default function Consultations() {
  const [selectedMeds, setSelectedMeds] = useState<
    { id: string; name: string; dosage: string }[]
  >([])
  const [currentMed, setCurrentMed] = useState('')
  const [currentDosage, setCurrentDosage] = useState('')

  const addMedication = () => {
    const med = medications.find((m) => m.id === currentMed)
    if (med && currentDosage) {
      setSelectedMeds([
        ...selectedMeds,
        { id: med.id, name: med.name, dosage: currentDosage },
      ])
      setCurrentMed('')
      setCurrentDosage('')
    }
  }

  const removeMedication = (index: number) => {
    const newMeds = [...selectedMeds]
    newMeds.splice(index, 1)
    setSelectedMeds(newMeds)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Novo Atendimento</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dados Clínicos</CardTitle>
            <CardDescription>
              Registre os sintomas e o diagnóstico.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="animal">Animal / Paciente</Label>
              <Select>
                <SelectTrigger id="animal">
                  <SelectValue placeholder="Selecione o animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rex">Rex - Maria Oliveira</SelectItem>
                  <SelectItem value="mimosa">Mimosa - João Silva</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="symptoms">Sintomas (Anamnese)</Label>
              <Textarea
                id="symptoms"
                placeholder="Descreva as queixas e observações..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="diagnosis">Diagnóstico</Label>
              <Input id="diagnosis" placeholder="Diagnóstico principal" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Observações Adicionais</Label>
              <Textarea id="notes" placeholder="Notas internas..." />
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Receituário</CardTitle>
            <CardDescription>
              Adicione medicamentos para gerar a receita.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <div className="flex gap-2 items-end">
              <div className="grid gap-2 flex-1">
                <Label>Medicamento</Label>
                <Select value={currentMed} onValueChange={setCurrentMed}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map((med) => (
                      <SelectItem key={med.id} value={med.id}>
                        {med.name} ({med.stock} disp.)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 flex-1">
                <Label>Posologia</Label>
                <Input
                  placeholder="Ex: 1 comp a cada 8h"
                  value={currentDosage}
                  onChange={(e) => setCurrentDosage(e.target.value)}
                />
              </div>
              <Button
                onClick={addMedication}
                disabled={!currentMed || !currentDosage}
                size="icon"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-md border flex-1 min-h-[150px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicamento</TableHead>
                    <TableHead>Posologia</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedMeds.length > 0 ? (
                    selectedMeds.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.dosage}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMedication(idx)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center text-muted-foreground h-24"
                      >
                        Nenhum medicamento adicionado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center pt-4 border-t mt-auto">
              <Button variant="outline" className="gap-2">
                <Printer className="h-4 w-4" /> Imprimir Receita
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4" /> Salvar Atendimento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
