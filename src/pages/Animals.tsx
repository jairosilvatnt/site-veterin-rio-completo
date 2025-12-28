import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Plus, Filter } from 'lucide-react'
import { animals } from '@/lib/mockData'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Animals() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecies, setFilterSpecies] = useState('all')
  const navigate = useNavigate()

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecies =
      filterSpecies === 'all' ||
      animal.species.toLowerCase() === filterSpecies.toLowerCase()
    return matchesSearch && matchesSpecies
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Animais</h1>
          <p className="text-muted-foreground">Catálogo de pacientes.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Animal
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar animal ou proprietário..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterSpecies} onValueChange={setFilterSpecies}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Espécie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Espécies</SelectItem>
            <SelectItem value="bovino">Bovinos</SelectItem>
            <SelectItem value="equino">Equinos</SelectItem>
            <SelectItem value="canino">Caninos</SelectItem>
            <SelectItem value="felino">Felinos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAnimals.map((animal) => (
          <Card
            key={animal.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(`/animais/${animal.id}`)}
          >
            <div className="aspect-square relative bg-muted">
              <img
                src={animal.image}
                alt={animal.name}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={
                    animal.status === 'Healthy'
                      ? 'secondary'
                      : animal.status === 'Treatment'
                        ? 'destructive'
                        : 'outline'
                  }
                  className="bg-background/80 backdrop-blur-sm shadow-sm"
                >
                  {animal.status === 'Healthy'
                    ? 'Saudável'
                    : animal.status === 'Treatment'
                      ? 'Em Tratamento'
                      : 'Recuperação'}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{animal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {animal.breed}
                  </p>
                </div>
                <Badge variant="outline">{animal.species}</Badge>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mt-4">
                <div className="flex justify-between">
                  <span>Idade:</span>
                  <span className="font-medium text-foreground">
                    {animal.age} anos
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Peso:</span>
                  <span className="font-medium text-foreground">
                    {animal.weight} kg
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t mt-2">
                  <span>Proprietário:</span>
                  <span
                    className="font-medium text-foreground truncate max-w-[120px]"
                    title={animal.ownerName}
                  >
                    {animal.ownerName}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredAnimals.length === 0 && (
          <div className="col-span-full h-48 flex items-center justify-center text-muted-foreground border-dashed border-2 rounded-lg">
            Nenhum animal encontrado com os filtros atuais.
          </div>
        )}
      </div>
    </div>
  )
}
