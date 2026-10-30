"use client"

import {
  IconBell,
  IconChartBar,
  IconDownload,
  IconLayoutDashboard,
  IconPlus,
  IconSearch,
  IconSettings,
  IconShoppingCart,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react"
import { cn } from "cn"

import { useLocale } from "@/components/locale-provider"
import { Avatar, AvatarFallback } from "@/registry/new-york-v4/ui/avatar"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table"

const SALES = [42, 61, 55, 78, 66, 90, 73]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

const ORDERS = [
  { name: "Olivia Martin", initials: "OM", status: "paid", amount: "$1,999.00" },
  { name: "Jackson Lee", initials: "JL", status: "pending", amount: "$39.00" },
  { name: "Isabella Nguyen", initials: "IN", status: "paid", amount: "$299.00" },
  { name: "William Kim", initials: "WK", status: "failed", amount: "$99.00" },
  { name: "Sofia Davis", initials: "SD", status: "refunded", amount: "$39.00" },
] as const

export function DashboardScreen() {
  const { t } = useLocale()
  const s = t.screens.dashboard

  const nav = [
    { icon: IconLayoutDashboard, label: s.navOverview, active: true },
    { icon: IconShoppingCart, label: s.navOrders },
    { icon: IconUsers, label: s.navCustomers },
    { icon: IconChartBar, label: s.navReports },
    { icon: IconSettings, label: s.navSettings },
  ]

  const statusVariant = {
    paid: "default",
    pending: "secondary",
    failed: "destructive",
    refunded: "outline",
  } as const

  const statusLabel = {
    paid: s.statusPaid,
    pending: s.statusPending,
    failed: s.statusFailed,
    refunded: s.statusRefunded,
  }

  const max = Math.max(...SALES)

  return (
    <div className="grid min-h-[560px] overflow-hidden rounded-lg border bg-background text-foreground md:grid-cols-[200px_1fr]">
      <aside className="hidden flex-col gap-1 border-r bg-sidebar p-3 text-sidebar-foreground md:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-1.5">
          <span className="flex size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <IconTrendingUp className="size-3.5" />
          </span>
          <span className="text-sm font-semibold">{s.brand}</span>
        </div>
        {nav.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active && "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
        <div className="mt-auto flex items-center gap-2 rounded-md border border-sidebar-border px-2 py-1.5">
          <Avatar size="sm">
            <AvatarFallback>RB</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-xs">
            <div className="truncate font-medium">Riab</div>
            <div className="truncate text-muted-foreground">riab@acme.com</div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="flex items-center gap-3 border-b px-4 py-2.5">
          <div className="relative max-w-xs flex-1">
            <IconSearch className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder={s.search} className="h-8 pl-8" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="size-8">
              <IconBell />
            </Button>
            <Avatar size="sm">
              <AvatarFallback>RB</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="text-sm text-muted-foreground">{s.subtitle}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <IconDownload />
                {s.export}
              </Button>
              <Button size="sm">
                <IconPlus />
                {s.newOrder}
              </Button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label={s.revenue} value="$45,231" delta="+20.1%" hint={s.vsLastWeek} />
            <Stat label={s.orders} value="2,350" delta="+12.5%" hint={s.vsLastWeek} />
            <Stat label={s.customers} value="573" delta="-2.4%" hint={s.vsLastWeek} negative />
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
            <Card className="gap-4 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">{s.chartTitle}</CardTitle>
                <CardDescription className="text-xs">
                  {s.chartDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4">
                <div className="flex h-36 items-end gap-2">
                  {SALES.map((v, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm"
                        style={{
                          height: `${(v / max) * 100}%`,
                          backgroundColor: `var(--chart-${(i % 5) + 1})`,
                        }}
                      />
                      <span className="text-[10px] text-muted-foreground">
                        {DAYS[i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">{s.recent}</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">{s.colCustomer}</TableHead>
                      <TableHead>{s.colStatus}</TableHead>
                      <TableHead className="pr-4 text-right">{s.colAmount}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ORDERS.map((o) => (
                      <TableRow key={o.name}>
                        <TableCell className="pl-4">
                          <div className="flex items-center gap-2">
                            <Avatar size="sm">
                              <AvatarFallback className="text-[10px]">
                                {o.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{o.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant[o.status]}>
                            {statusLabel[o.status]}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-4 text-right tabular-nums">
                          {o.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  label,
  value,
  delta,
  hint,
  negative,
}: {
  label: string
  value: string
  delta: string
  hint: string
  negative?: boolean
}) {
  return (
    <Card className="gap-1 py-4">
      <CardHeader className="px-4">
        <CardDescription className="text-xs">{label}</CardDescription>
        <CardTitle className="text-xl tabular-nums">{value}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 text-xs text-muted-foreground">
        <span className={cn("font-medium", negative ? "text-destructive" : "text-primary")}>
          {delta}
        </span>{" "}
        {hint}
      </CardContent>
    </Card>
  )
}
