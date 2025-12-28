import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Tractor,
  User,
} from 'lucide-react'
import { clients } from '@/lib/mockData'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Clientes
          </h1>
          <p className="text-muted-foreground">
            Gerencie proprietários e fazendas.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <CardTitle>Lista de Clientes</CardTitle>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="farm">Fazendas</TabsTrigger>
                <TabsTrigger value="domestic">Domésticos</TabsTrigger>
              </TabsList>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, fazenda ou local..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <TabsContent value="all" className="m-0">
              <ClientTable data={filteredClients} />
            </TabsContent>
            <TabsContent value="farm" className="m-0">
              <ClientTable
                data={filteredClients.filter((c) => c.type === 'Farm')}
              />
            </TabsContent>
            <TabsContent value="domestic" className="m-0">
              <ClientTable
                data={filteredClients.filter((c) => c.type === 'Domestic')}
              />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  )
}

function ClientTable({ data }: { data: typeof clients }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome / Fazenda</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead className="text-right">Animais</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'p-1.5 rounded-full bg-muted',
                        client.type === 'Farm'
                          ? 'text-amber-600'
                          : 'text-blue-600',
                      )}
                    >
                      {client.type === 'Farm' ? (
                        <Tractor className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <span>{client.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{client.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {client.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={client.type === 'Farm' ? 'secondary' : 'outline'}
                  >
                    {client.type === 'Farm' ? 'Rural' : 'Doméstico'}
                  </Badge>
                </TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell className="text-right font-mono">
                  {client.animalsCount}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

// Helper for cn in this file
import { cn } from '@/lib/utils'
